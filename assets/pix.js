// Pix "copia e cola" (BR Code estático, padrão EMV do Banco Central) + gerador de QR Code em SVG.
// Sem dependências e sem serviço externo. Carregado só quando a pessoa abre "Apoiar o desenvolvimento".
// Teste: node tools/testar-pix.mjs
(function (root) {
  'use strict';
  // ---------- BR Code ----------
  function clean(s, max) { // o padrão pede texto simples: sem acentos, maiúsculas, tamanho limitado
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 .\-]/g, '').toUpperCase().trim().slice(0, max);
  }
  function tlv(id, v) { v = String(v); if (v.length > 99) throw new Error('campo ' + id + ' longo demais'); return id + (v.length < 10 ? '0' : '') + v.length + v; }
  /** CRC16-CCITT-FALSE: polinômio 0x1021, valor inicial 0xFFFF, sem reflexão, sem XOR final */
  function crc16(s) {
    var c = 0xFFFF;
    for (var i = 0; i < s.length; i++) { c ^= (s.charCodeAt(i) & 0xFF) << 8; for (var b = 0; b < 8; b++) c = c & 0x8000 ? ((c << 1) ^ 0x1021) & 0xFFFF : (c << 1) & 0xFFFF; }
    return ('000' + c.toString(16).toUpperCase()).slice(-4);
  }
  /** Pix estático SEM valor fixo (quem paga digita o valor). o = { key, name, city, txid } */
  function payload(o) {
    var key = String(o.key || '').trim(); if (!key) throw new Error('chave Pix vazia');
    var p = tlv('00', '01') +                                              // versão do payload
      tlv('26', tlv('00', 'br.gov.bcb.pix') + tlv('01', key)) +            // conta: arranjo Pix + chave
      tlv('52', '0000') +                                                  // categoria (não informada)
      tlv('53', '986') +                                                   // moeda: real
      tlv('58', 'BR') +                                                    // país
      tlv('59', clean(o.name, 25) || 'N') +                                // nome do recebedor
      tlv('60', clean(o.city, 15) || 'BRASIL') +                           // cidade
      tlv('62', tlv('05', String(o.txid || '***').replace(/[^A-Za-z0-9*]/g, '').slice(0, 25) || '***')) + // identificador (*** = livre)
      '6304';                                                              // o CRC cobre tudo até aqui, inclusive "6304"
    return p + crc16(p);
  }

  // ---------- QR Code (modo byte, correção de erro M, versões 1–10) ----------
  // [palavras de dados, palavras de correção por bloco, [nº de blocos, dados por bloco] ...]
  var VER = [null, [16, 10, [1, 16]], [28, 16, [1, 28]], [44, 26, [1, 44]], [64, 18, [2, 32]], [86, 24, [2, 43]], [108, 16, [4, 27]], [124, 18, [4, 31]], [154, 22, [2, 38], [2, 39]], [182, 22, [3, 36], [2, 37]], [216, 26, [4, 43], [1, 44]]];
  var ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];
  var EXP = [], LOG = [];
  (function () { var x = 1; for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11D; } for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255]; })();
  function mul(a, b) { return a && b ? EXP[LOG[a] + LOG[b]] : 0; }
  function rs(data, n) { // resto da divisão pelo polinômio gerador de grau n
    var g = [1], i, j; for (i = 0; i < n; i++) { var ng = []; for (j = 0; j <= g.length; j++) ng[j] = (j < g.length ? mul(g[j], EXP[i]) : 0) ^ (j > 0 ? g[j - 1] : 0); g = ng; }
    // g[k] = coeficiente de x^k (g[n] = 1)
    var r = []; for (i = 0; i < n; i++) r[i] = 0;
    for (i = 0; i < data.length; i++) { var f = data[i] ^ r[0]; r.shift(); r.push(0); for (j = 0; j < n; j++) r[j] ^= mul(g[n - 1 - j], f); }
    return r;
  }
  function utf8(s) { var o = [], e = unescape(encodeURIComponent(s)); for (var i = 0; i < e.length; i++) o.push(e.charCodeAt(i)); return o; }
  function qrMatrix(text) {
    var bytes = utf8(text), v, i, j, k;
    for (v = 1; v <= 10; v++) if (bytes.length <= VER[v][0] - (v < 10 ? 2 : 3)) break;
    if (v > 10) throw new Error('texto longo demais para o QR');
    var spec = VER[v], total = spec[0], ecn = spec[1], bits = [];
    function put(val, n) { for (var q = n - 1; q >= 0; q--) bits.push((val >>> q) & 1); }
    put(4, 4); put(bytes.length, v < 10 ? 8 : 16); for (i = 0; i < bytes.length; i++) put(bytes[i], 8);
    put(0, Math.min(4, total * 8 - bits.length)); while (bits.length % 8) bits.push(0);
    var cw = []; for (i = 0; i < bits.length; i += 8) { var b = 0; for (j = 0; j < 8; j++) b = (b << 1) | bits[i + j]; cw.push(b); }
    for (i = 0; cw.length < total; i++) cw.push(i % 2 ? 0x11 : 0xEC);
    var blocks = [], ecs = [], pos = 0, maxD = 0;
    for (i = 2; i < spec.length; i++) for (j = 0; j < spec[i][0]; j++) { var d = cw.slice(pos, pos + spec[i][1]); pos += spec[i][1]; blocks.push(d); ecs.push(rs(d, ecn)); if (d.length > maxD) maxD = d.length; }
    var out = []; for (i = 0; i < maxD; i++) for (j = 0; j < blocks.length; j++) if (i < blocks[j].length) out.push(blocks[j][i]);
    for (i = 0; i < ecn; i++) for (j = 0; j < ecs.length; j++) out.push(ecs[j][i]);

    var n = 17 + 4 * v, M = [], F = []; // M = módulos (1 = escuro), F = módulo de função (não recebe dados nem máscara)
    for (i = 0; i < n; i++) { M.push(new Array(n).fill(0)); F.push(new Array(n).fill(0)); }
    function set(x, y, val) { M[y][x] = val ? 1 : 0; F[y][x] = 1; }
    function finder(cx, cy) { for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) { var x = cx + dx, y = cy + dy; if (x < 0 || y < 0 || x >= n || y >= n) continue; var m = Math.max(Math.abs(dx), Math.abs(dy)); set(x, y, m !== 2 && m !== 4); } }
    for (i = 0; i < n; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); } // linhas de sincronismo
    finder(3, 3); finder(n - 4, 3); finder(3, n - 4);
    var al = ALIGN[v];
    for (i = 0; i < al.length; i++) for (j = 0; j < al.length; j++) { if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) continue;
      for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++) set(al[i] + dx, al[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1); }
    function format(mask) { // nível M = 00
      var data = mask, rem = data; for (var q = 0; q < 10; q++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
      var fb = ((data << 10) | rem) ^ 0x5412, bit = function (q) { return (fb >>> q) & 1; };
      for (q = 0; q <= 5; q++) set(8, q, bit(q)); set(8, 7, bit(6)); set(8, 8, bit(7)); set(7, 8, bit(8)); for (q = 9; q < 15; q++) set(14 - q, 8, bit(q));
      for (q = 0; q < 8; q++) set(n - 1 - q, 8, bit(q)); for (q = 8; q < 15; q++) set(8, n - 15 + q, bit(q)); set(8, n - 8, 1);
    }
    format(0); // reserva as áreas de formato
    if (v >= 7) { var rem = v; for (i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25); var vb = (v << 12) | rem;
      for (i = 0; i < 18; i++) { var bt = (vb >>> i) & 1, a = n - 11 + (i % 3), c = Math.floor(i / 3); set(a, c, bt); set(c, a, bt); } }
    k = 0; // dados em zigue-zague, de baixo para cima a partir do canto inferior direito
    for (var right = n - 1; right >= 1; right -= 2) { if (right === 6) right = 5;
      for (var vert = 0; vert < n; vert++) for (j = 0; j < 2; j++) { var x = right - j, up = ((right + 1) & 2) === 0, y = up ? n - 1 - vert : vert;
        if (!F[y][x] && k < out.length * 8) { M[y][x] = (out[k >>> 3] >>> (7 - (k & 7))) & 1; k++; } } }
    var MASK = [function (x, y) { return (x + y) % 2 === 0; }, function (x, y) { return y % 2 === 0; }, function (x, y) { return x % 3 === 0; }, function (x, y) { return (x + y) % 3 === 0; },
      function (x, y) { return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; }, function (x, y) { return (x * y) % 2 + (x * y) % 3 === 0; },
      function (x, y) { return ((x * y) % 2 + (x * y) % 3) % 2 === 0; }, function (x, y) { return ((x + y) % 2 + (x * y) % 3) % 2 === 0; }];
    function apply(m) { for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (!F[y][x] && MASK[m](x, y)) M[y][x] ^= 1; }
    function penalty() {
      var p = 0, x, y, dark = 0;
      for (var pass = 0; pass < 2; pass++) for (y = 0; y < n; y++) { var run = 1, line = '';
        for (x = 0; x < n; x++) { var c = pass ? M[x][y] : M[y][x]; line += c; if (x > 0) { var pv = pass ? M[x - 1][y] : M[y][x - 1]; if (c === pv) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; } }
        var idx = -1; while ((idx = line.indexOf('10111010000', idx + 1)) >= 0) p += 40; idx = -1; while ((idx = line.indexOf('00001011101', idx + 1)) >= 0) p += 40; }
      for (y = 0; y < n - 1; y++) for (x = 0; x < n - 1; x++) { var q = M[y][x]; if (q === M[y][x + 1] && q === M[y + 1][x] && q === M[y + 1][x + 1]) p += 3; }
      for (y = 0; y < n; y++) for (x = 0; x < n; x++) dark += M[y][x];
      return p + Math.floor(Math.abs(dark * 20 - n * n * 10) / (n * n)) * 10;
    }
    var best = 0, bestP = Infinity;
    for (var m = 0; m < 8; m++) { apply(m); format(m); var pp = penalty(); if (pp < bestP) { bestP = pp; best = m; } apply(m); }
    apply(best); format(best);
    return { size: n, version: v, mask: best, modules: M };
  }
  /** SVG com fundo branco e margem de 4 módulos (exigida pelo padrão para a câmera achar o código) */
  function qrSvg(text, label) {
    var q = qrMatrix(text), n = q.size, Q = 4, d = '';
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (q.modules[y][x]) { var w = 1; while (x + w < n && q.modules[y][x + w]) w++; d += 'M' + (x + Q) + ' ' + (y + Q) + 'h' + w + 'v1h-' + w + 'z'; x += w - 1; }
    var s = n + 2 * Q;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '" width="' + s * 4 + '" height="' + s * 4 + '" shape-rendering="crispEdges" role="img" aria-label="' + String(label || 'QR Code Pix').replace(/[&<>"]/g, '') + '"><rect width="' + s + '" height="' + s + '" fill="#fff"/><path fill="#000" d="' + d + '"/></svg>';
  }
  root.Pix = { payload: payload, crc16: crc16, qrMatrix: qrMatrix, qrSvg: qrSvg, clean: clean };
})(typeof window !== 'undefined' ? window : globalThis);
