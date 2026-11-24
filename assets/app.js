// EVEREST MOTORBIKE — landing (sem dependências). Links em config.js, jogos em games.js, anúncios em ads-config.js.
(function () {
  'use strict';
  var S = window.SITE || {}, ADS = window.ADS || {}, D = document, $ = function (id) { return D.getElementById(id); };
  var q = new URLSearchParams(location.search), store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  // ---------- idiomas ----------
  var T = {
    pt: { 'skip': 'Pular para os jogos', 'ig.msg': 'Você está no navegador do <b>Instagram</b>. Para jogar melhor e instalar, toque em <b>⋯</b> (canto superior) e escolha <b>“Abrir no navegador”</b>.', 'ig.open': 'Abrir no Chrome', 'copy': 'Copiar link', 'copied': 'Link copiado!', 'copyFail': 'Copie o link: ',
      'hero.aria': 'Jogar Everest Motorbike agora', 'hero.alt': 'Piloto de moto descendo o Everest na neve com nitro, cena do jogo Everest Motorbike', 'hero.tap': 'Toque para jogar', 'hero.h1': 'Desça o Everest <em>de moto</em>', 'hero.sub': 'Avalanche, queda de 650 m pelas nuvens, onda gigante e surfe na lava. Direto no navegador, sem baixar nada.',
      'cta.play': 'Jogar agora', 'cta.free': '(GRÁTIS)', 'cta.install': 'Instalar no celular', 'f.km': '25,9 km de descida', 'f.dev': 'Celular e PC', 'f.lang': 'PT · EN · ES', 'ad': 'Publicidade',
      'games.h': 'Meus games em desenvolvimento', 'games.lead': 'Faço tudo sozinho: código, mundo 3D low poly e trilha sonora. Jogue as versões de teste e me conte o que achou.', 'g.play': 'Jogar', 'g.soon': 'EM BREVE', 'g.touch': 'Celular', 'g.keys': 'PC', 'g.shot': 'Captura do jogo',
      'ctrl.h': 'Controles', 'ctrl.lead': 'Dá para jogar com um dedo só. No PC, teclado.', 'ctrl.touch': 'No celular', 'ctrl.pc': 'No PC', 't.hold': 'Dedo na tela = acelera (soltou, freia)', 't.drag': 'Arraste para os lados = pilota', 't.nitro': 'Toque duplo = nitro: a moto acelera sozinha (pode soltar o dedo)', 't.wheelie': 'Deslize para baixo = empinar (só com nitro ativo)', 't.trick': 'No ar, deslize o dedo = manobras',
      'k.acc': 'acelera', 'k.steer': 'pilota (ou ← →)', 'k.nitro': 'nitro (acelera sozinho)', 'k.wheelie': 'em sequência = empinar (só com nitro)', 'k.trick': 'manobras no ar',
      'nv.h': 'Novidades da build 5.1', 'nv.1': 'Tema musical original, com uma variação para cada trecho da descida.', 'nv.2': 'O piloto grita tudo o que vê, em português, inglês e espanhol.', 'nv.3': 'Onda gigante: dá para atravessar o tubo… se o nitro deixar.', 'nv.4': 'Tempestade na floresta: raio, lama na cara e tronco em chamas.', 'nv.5': 'Gelo de vidro na caverna: só quebra com nitro.', 'nv.6': 'Tubarão no mar: viu a nadadeira, desvia!', 'nv.7': 'Mortes cômicas: a alma sobe de asinhas (às vezes montada num alce). E são só 3 vidas!', 'nv.8': 'Macaco de carona: empine na selva e ganhe um passageiro.',
      'about.h': 'Sobre', 'about.role': 'Criador de jogos independente · Brasil', 'about.p1': 'O Everest Motorbike está em <strong>BETA</strong>: ainda estou ajustando, e o seu teste ajuda muito. A versão completa vai sair nas lojas:', 'about.p2': 'Siga no Instagram para saber primeiro. Achou um bug ou tem uma ideia? Me chame por lá — é o meu canal de contato.', 'about.follow': 'Seguir', 'st.soon': 'em breve', 'st.aria': 'Lojas (em breve)', 'ft.pix': 'Apoiar (Pix)', 'pix.h': 'Apoie o desenvolvimento', 'pix.lead': 'O jogo é grátis e vai continuar assim. Se curtiu, qualquer valor ajuda a manter o projeto. Doação voluntária: não dá direito a nada no jogo.', 'pix.btn': 'Apoiar o desenvolvimento', 'pix.t': 'Apoiar com Pix', 'pix.txt': 'O jogo é grátis. Se curtiu, qualquer valor ajuda — doação voluntária, não dá direito a nada.', 'pix.br': '', 'pix.to': 'Recebedor', 'pix.how': 'No app do seu banco: Pix → Ler QR Code, ou Pix Copia e Cola. Você escolhe o valor e confere o nome antes de confirmar.', 'pix.copy': 'Copiar Pix copia e cola', 'pix.key': 'Copiar chave aleatória', 'pix.done': 'Copiado!', 'pix.qr': 'QR Code do Pix para doação', 'pix.fail': 'Não deu para gerar o QR Code. Use a chave abaixo.',
      'ft.priv': 'Privacidade', 'ft.terms': 'Termos', 'ft.contact': 'Contato (Instagram)', 'ft.cookies': 'Preferências de anúncios', 'ft.made': 'feito no Brasil', 'close': 'Fechar', 'back': '← Voltar ao início',
      'in.t': 'Instalar no celular', 'in.go': 'Abrir o jogo', 'in.ok': 'Instalado! Procure o ícone na tela inicial.',
      'in.ios': ['Abra o jogo no <b>Safari</b> (botão abaixo).', 'Toque em <b>Compartilhar</b> {share} na barra do Safari.', 'Escolha <b>“Adicionar à Tela de Início”</b> {plus} e confirme.'],
      'in.and': ['Abra o jogo no <b>Chrome</b> (botão abaixo).', 'Toque no menu <b>⋮</b> do Chrome.', 'Escolha <b>“Adicionar à tela inicial”</b> ou <b>“Instalar app”</b>.'],
      'in.ig': ['Toque em <b>⋯</b> no canto superior desta tela.', 'Escolha <b>“Abrir no navegador”</b> (Chrome ou Safari).', 'Lá, toque de novo em <b>Instalar no celular</b>.'],
      'in.pc': ['Abra o jogo (botão abaixo).', 'No Chrome ou Edge, clique no ícone <b>Instalar</b> {plus} na barra de endereço.', 'No celular: abra este site pelo navegador e toque em Instalar.'],
      'cs.msg': 'Este site mostra anúncios do Google para manter os jogos gratuitos. Podemos usar cookies para anúncios personalizados?', 'cs.yes': 'Aceitar', 'cs.no': 'Recusar', 'cs.more': 'Política de privacidade', '404.h': 'Caiu da montanha!', '404.p': 'Esta página não existe. Volte para a trilha:' },
    en: { 'skip': 'Skip to games', 'ig.msg': 'You are in the <b>Instagram</b> browser. To play better and install, tap <b>⋯</b> (top corner) and choose <b>“Open in browser”</b>.', 'ig.open': 'Open in Chrome', 'copy': 'Copy link', 'copied': 'Link copied!', 'copyFail': 'Copy the link: ',
      'hero.aria': 'Play Everest Motorbike now', 'hero.alt': 'Rider going down Mount Everest on a dirt bike with nitro, scene from the game Everest Motorbike', 'hero.tap': 'Tap to play', 'hero.h1': 'Ride down Everest <em>on a dirt bike</em>', 'hero.sub': 'Avalanche, a 650 m drop through the clouds, a giant wave and lava surfing. Right in your browser, nothing to download.',
      'cta.play': 'Play now', 'cta.free': '(FREE)', 'cta.install': 'Install on phone', 'f.km': '25.9 km descent', 'f.dev': 'Phone & PC', 'f.lang': 'PT · EN · ES', 'ad': 'Advertisement',
      'games.h': 'My games in development', 'games.lead': 'I make everything myself: code, low-poly 3D world and soundtrack. Play the test builds and tell me what you think.', 'g.play': 'Play', 'g.soon': 'COMING SOON', 'g.touch': 'Phone', 'g.keys': 'PC', 'g.shot': 'Game screenshot',
      'ctrl.h': 'Controls', 'ctrl.lead': 'Playable with one finger. On PC, keyboard.', 'ctrl.touch': 'On phone', 'ctrl.pc': 'On PC', 't.hold': 'Finger on screen = accelerate (release to brake)', 't.drag': 'Drag sideways = steer', 't.nitro': 'Double tap = nitro: the bike speeds up by itself (you can lift your finger)', 't.wheelie': 'Swipe down = wheelie (only while nitro is on)', 't.trick': 'In the air, swipe = tricks',
      'k.acc': 'accelerate', 'k.steer': 'steer (or ← →)', 'k.nitro': 'nitro (speeds up by itself)', 'k.wheelie': 'tap repeatedly = wheelie (nitro only)', 'k.trick': 'air tricks',
      'nv.h': 'What’s new in build 5.1', 'nv.1': 'An original music theme, with a variation for every stretch of the ride.', 'nv.2': 'The rider yells about everything he sees, in English, Portuguese and Spanish.', 'nv.3': 'Giant wave: you can ride through the tube… if your nitro holds.', 'nv.4': 'Jungle storm: lightning, mud in your face and a burning log.', 'nv.5': 'Glass ice in the cave: it only breaks with nitro.', 'nv.6': 'Shark at sea: see the fin, swerve!', 'nv.7': 'Comic deaths: your soul floats up on tiny wings (sometimes riding a moose). And you only get 3 lives!', 'nv.8': 'Monkey hitchhiker: pop a wheelie in the jungle and pick up a passenger.',
      'about.h': 'About', 'about.role': 'Independent game creator · Brazil', 'about.p1': 'Everest Motorbike is in <strong>BETA</strong>: I am still tuning it, and your playtest helps a lot. The full version is coming to the stores:', 'about.p2': 'Follow on Instagram to hear first. Found a bug or have an idea? Message me there — it is my contact channel.', 'about.follow': 'Follow', 'st.soon': 'coming soon', 'st.aria': 'Stores (coming soon)', 'ft.pix': 'Support (Pix)', 'pix.h': 'Support development', 'pix.lead': 'The game is free and will stay free. If you enjoyed it, any amount helps keep the project going. Voluntary donation: it unlocks nothing in the game.', 'pix.btn': 'Support development', 'pix.t': 'Support with Pix', 'pix.txt': 'The game is free. If you enjoyed it, any amount helps — a voluntary donation that gives you nothing in return.', 'pix.br': 'Pix works only with bank accounts in Brazil. Outside Brazil, the best support is following and sharing the game.', 'pix.to': 'Recipient', 'pix.how': 'In your Brazilian banking app: Pix → Scan QR Code, or Pix Copy and Paste. You choose the amount and check the name before confirming.', 'pix.copy': 'Copy Pix code', 'pix.key': 'Copy random key', 'pix.done': 'Copied!', 'pix.qr': 'Pix QR Code for donations', 'pix.fail': 'Could not generate the QR Code. Use the key below.',
      'ft.priv': 'Privacy', 'ft.terms': 'Terms', 'ft.contact': 'Contact (Instagram)', 'ft.cookies': 'Ad preferences', 'ft.made': 'made in Brazil', 'close': 'Close', 'back': '← Back to home',
      'in.t': 'Install on your phone', 'in.go': 'Open the game', 'in.ok': 'Installed! Look for the icon on your home screen.',
      'in.ios': ['Open the game in <b>Safari</b> (button below).', 'Tap <b>Share</b> {share} in the Safari bar.', 'Choose <b>“Add to Home Screen”</b> {plus} and confirm.'],
      'in.and': ['Open the game in <b>Chrome</b> (button below).', 'Tap the Chrome menu <b>⋮</b>.', 'Choose <b>“Add to Home screen”</b> or <b>“Install app”</b>.'],
      'in.ig': ['Tap <b>⋯</b> in the top corner of this screen.', 'Choose <b>“Open in browser”</b> (Chrome or Safari).', 'There, tap <b>Install on phone</b> again.'],
      'in.pc': ['Open the game (button below).', 'In Chrome or Edge, click the <b>Install</b> icon {plus} in the address bar.', 'On a phone: open this site in the browser and tap Install.'],
      'cs.msg': 'This site shows Google ads to keep the games free. May we use cookies for personalised ads?', 'cs.yes': 'Accept', 'cs.no': 'Decline', 'cs.more': 'Privacy policy', '404.h': 'You fell off the mountain!', '404.p': 'This page does not exist. Back to the trail:' },
    es: { 'skip': 'Saltar a los juegos', 'ig.msg': 'Estás en el navegador de <b>Instagram</b>. Para jugar mejor e instalar, toca <b>⋯</b> (esquina superior) y elige <b>“Abrir en el navegador”</b>.', 'ig.open': 'Abrir en Chrome', 'copy': 'Copiar enlace', 'copied': '¡Enlace copiado!', 'copyFail': 'Copia el enlace: ',
      'hero.aria': 'Jugar Everest Motorbike ahora', 'hero.alt': 'Piloto bajando el Everest en moto por la nieve con nitro, escena del juego Everest Motorbike', 'hero.tap': 'Toca para jugar', 'hero.h1': 'Baja el Everest <em>en moto</em>', 'hero.sub': 'Avalancha, caída de 650 m entre las nubes, ola gigante y surf en la lava. Directo en el navegador, sin descargar nada.',
      'cta.play': 'Jugar ahora', 'cta.free': '(GRATIS)', 'cta.install': 'Instalar en el móvil', 'f.km': '25,9 km de descenso', 'f.dev': 'Móvil y PC', 'f.lang': 'PT · EN · ES', 'ad': 'Publicidad',
      'games.h': 'Mis juegos en desarrollo', 'games.lead': 'Lo hago todo yo: código, mundo 3D low poly y banda sonora. Juega las versiones de prueba y cuéntame qué te parecen.', 'g.play': 'Jugar', 'g.soon': 'PRÓXIMAMENTE', 'g.touch': 'Móvil', 'g.keys': 'PC', 'g.shot': 'Captura del juego',
      'ctrl.h': 'Controles', 'ctrl.lead': 'Se juega con un solo dedo. En PC, teclado.', 'ctrl.touch': 'En el móvil', 'ctrl.pc': 'En PC', 't.hold': 'Dedo en la pantalla = acelera (al soltar, frena)', 't.drag': 'Arrastra a los lados = pilota', 't.nitro': 'Doble toque = nitro: la moto acelera sola (puedes soltar el dedo)', 't.wheelie': 'Desliza hacia abajo = caballito (solo con nitro activo)', 't.trick': 'En el aire, desliza el dedo = trucos',
      'k.acc': 'acelera', 'k.steer': 'pilota (o ← →)', 'k.nitro': 'nitro (acelera solo)', 'k.wheelie': 'pulsa varias veces = caballito (solo con nitro)', 'k.trick': 'trucos en el aire',
      'nv.h': 'Novedades de la build 5.1', 'nv.1': 'Tema musical original, con una variación para cada tramo del descenso.', 'nv.2': 'El piloto grita todo lo que ve, en español, inglés y portugués.', 'nv.3': 'Ola gigante: puedes cruzar el tubo… si el nitro te alcanza.', 'nv.4': 'Tormenta en la selva: rayos, barro en la cara y un tronco en llamas.', 'nv.5': 'Hielo de cristal en la cueva: solo se rompe con nitro.', 'nv.6': 'Tiburón en el mar: ¿viste la aleta? ¡Esquiva!', 'nv.7': 'Muertes cómicas: el alma sube con alitas (a veces montada en un alce). ¡Y solo hay 3 vidas!', 'nv.8': 'Mono de paquete: haz caballito en la selva y llévate un pasajero.',
      'about.h': 'Acerca de', 'about.role': 'Creador de juegos independiente · Brasil', 'about.p1': 'Everest Motorbike está en <strong>BETA</strong>: todavía lo estoy ajustando y tu prueba ayuda mucho. La versión completa llegará a las tiendas:', 'about.p2': 'Sígueme en Instagram para enterarte primero. ¿Encontraste un error o tienes una idea? Escríbeme allí: es mi canal de contacto.', 'about.follow': 'Seguir', 'st.soon': 'próximamente', 'st.aria': 'Tiendas (próximamente)', 'ft.pix': 'Apoyar (Pix)', 'pix.h': 'Apoya el desarrollo', 'pix.lead': 'El juego es gratis y lo seguirá siendo. Si te gustó, cualquier importe ayuda a mantener el proyecto. Donación voluntaria: no da derecho a nada en el juego.', 'pix.btn': 'Apoyar el desarrollo', 'pix.t': 'Apoyar con Pix', 'pix.txt': 'El juego es gratis. Si te gustó, cualquier importe ayuda: donación voluntaria, no da derecho a nada.', 'pix.br': 'Pix solo funciona con cuentas bancarias de Brasil. Fuera de Brasil, la mejor ayuda es seguir y compartir el juego.', 'pix.to': 'Destinatario', 'pix.how': 'En la app de tu banco brasileño: Pix → Leer código QR, o Pix Copia y Pega. Tú eliges el importe y compruebas el nombre antes de confirmar.', 'pix.copy': 'Copiar código Pix', 'pix.key': 'Copiar clave aleatoria', 'pix.done': '¡Copiado!', 'pix.qr': 'Código QR de Pix para donaciones', 'pix.fail': 'No se pudo generar el código QR. Usa la clave de abajo.',
      'ft.priv': 'Privacidad', 'ft.terms': 'Términos', 'ft.contact': 'Contacto (Instagram)', 'ft.cookies': 'Preferencias de anuncios', 'ft.made': 'hecho en Brasil', 'close': 'Cerrar', 'back': '← Volver al inicio',
      'in.t': 'Instalar en el móvil', 'in.go': 'Abrir el juego', 'in.ok': '¡Instalado! Busca el icono en la pantalla de inicio.',
      'in.ios': ['Abre el juego en <b>Safari</b> (botón de abajo).', 'Toca <b>Compartir</b> {share} en la barra de Safari.', 'Elige <b>“Añadir a pantalla de inicio”</b> {plus} y confirma.'],
      'in.and': ['Abre el juego en <b>Chrome</b> (botón de abajo).', 'Toca el menú <b>⋮</b> de Chrome.', 'Elige <b>“Añadir a pantalla de inicio”</b> o <b>“Instalar aplicación”</b>.'],
      'in.ig': ['Toca <b>⋯</b> en la esquina superior de esta pantalla.', 'Elige <b>“Abrir en el navegador”</b> (Chrome o Safari).', 'Allí, toca otra vez <b>Instalar en el móvil</b>.'],
      'in.pc': ['Abre el juego (botón de abajo).', 'En Chrome o Edge, haz clic en el icono <b>Instalar</b> {plus} de la barra de direcciones.', 'En el móvil: abre este sitio en el navegador y toca Instalar.'],
      'cs.msg': 'Este sitio muestra anuncios de Google para mantener los juegos gratis. ¿Podemos usar cookies para anuncios personalizados?', 'cs.yes': 'Aceptar', 'cs.no': 'Rechazar', 'cs.more': 'Política de privacidad', '404.h': '¡Te caíste de la montaña!', '404.p': 'Esta página no existe. Vuelve a la pista:' }
  };
  var LANGS = S.LANGS || ['pt', 'en', 'es'], HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };
  function pick() {
    var l = q.get('lang') || store.get('emb.lang'); if (l && T[l]) return l;
    var n = navigator.languages || [navigator.language || 'pt'];
    for (var i = 0; i < n.length; i++) { var c = String(n[i]).slice(0, 2).toLowerCase(); if (LANGS.indexOf(c) >= 0) return c; }
    return 'en'; // quem não fala PT/ES recebe inglês
  }
  var lang = pick();
  function t(k) { return (T[lang] && T[lang][k]) || T.pt[k] || k; }
  function L(o) { return o == null ? '' : typeof o === 'string' ? o : o[lang] || o.pt || ''; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function applyLang() {
    D.documentElement.lang = HTML_LANG[lang];
    D.querySelectorAll('[data-i]').forEach(function (e) { e.innerHTML = t(e.getAttribute('data-i')); });
    D.querySelectorAll('[data-i-aria]').forEach(function (e) { e.setAttribute('aria-label', t(e.getAttribute('data-i-aria'))); });
    D.querySelectorAll('[data-i-alt]').forEach(function (e) { e.alt = t(e.getAttribute('data-i-alt')); });
    D.querySelectorAll('[data-lang-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang)); });
    D.querySelectorAll('[data-lang]').forEach(function (e) { e.classList.toggle('on', e.getAttribute('data-lang') === lang); });
    var br = $('pixBr'); if (br) br.hidden = !t('pix.br') || t('pix.br') === 'pix.br';
    if (window.__pixOpen) pixRender();
    renderGames();
  }
  D.querySelectorAll('[data-lang-btn]').forEach(function (b) { b.addEventListener('click', function () { lang = b.getAttribute('data-lang-btn'); store.set('emb.lang', lang); applyLang(); }); });

  // ---------- links configuráveis ----------
  function links() {
    if (S.GAME_URL) D.querySelectorAll('[data-game]').forEach(function (a) { a.href = S.GAME_URL; });
    if (S.INSTAGRAM) D.querySelectorAll('[data-ig]').forEach(function (a) { a.href = S.INSTAGRAM; });
  }

  // ---------- jogos (games.js) ----------
  var MTN = '<svg class="mtn" viewBox="0 0 120 80" aria-hidden="true"><path d="M0 80 38 18l14 20 16-30 52 72z"/></svg>';
  function renderGames() {
    var st = $('stores'), g0 = (window.GAMES || [])[0]; // chips das lojas: só rótulos, sem link
    if (st && g0 && g0.platforms) st.innerHTML = g0.platforms.map(function (p) { return '<li>' + esc(L(p.name)) + (p.note ? ' <span>(' + esc(L(p.note)) + ')</span>' : '') + ' <small>' + t('st.soon') + '</small></li>'; }).join('');
    var box = $('cards'); if (!box || !window.GAMES) return;
    box.innerHTML = window.GAMES.map(function (g) {
      if (g.status === 'soon') return '<article class="card ph"><h3>' + esc(L(g.name)) + '</h3><p>' + esc(L(g.desc)) + '</p><span class="pill soon">' + t('g.soon') + '</span>' + MTN + '</article>';
      var url = esc(g.url || S.GAME_URL || '#'), name = esc(L(g.name));
      return '<article class="card game"><h3>' + name + ' <span class="pill">' + esc(String(g.status || 'beta').toUpperCase()) + '</span></h3>' +
        '<a class="shots" href="' + url + '" aria-label="' + t('g.play') + ' ' + name + '">' + (g.shots || []).slice(0, 3).map(function (s, i) { return '<img src="' + esc(s) + '" width="412" height="860" loading="lazy" decoding="async" alt="' + t('g.shot') + ' ' + (i + 1) + ' — ' + name + '">'; }).join('') + '</a>' +
        '<p>' + esc(L(g.desc)) + '</p><ul class="mini">' + (g.touch ? '<li><b>' + t('g.touch') + '</b>' + esc(L(g.touch)) + '</li>' : '') + (g.keys ? '<li><b>' + t('g.keys') + '</b>' + esc(L(g.keys)) + '</li>' : '') + '</ul>' +
        '<a class="btn play" style="min-height:58px;font-size:24px" href="' + url + '">' + t('g.play') + '</a></article>';
    }).join('');
  }

  // ---------- banner do hero: vídeo (carregado só depois da página) ou slideshow ----------
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches, SAVE = navigator.connection && navigator.connection.saveData, slidesOn = false;
  function slides() {
    var m = $('media'); if (!m || slidesOn) return; slidesOn = true; m.classList.remove('playing'); var v = m.querySelector('video'); if (v) { try { v.pause(); } catch (e) {} v.remove(); }
    var els = [], i = 0, n = 5; if (!RM) m.classList.add('kb');
    for (var k = 1; k <= n; k++) { var im = new Image(); im.className = 'slide'; im.alt = ''; im.decoding = 'async'; im.width = 540; im.height = 675; im.src = 'assets/img/slide-' + k + '.webp'; m.insertBefore(im, m.querySelector('.badge')); els.push(im); }
    function next() { var e = els[i % n]; if (!e.complete || !e.naturalWidth) { i++; return; } els.forEach(function (x) { x.classList.remove('on'); }); e.classList.add('on'); i++; }
    setTimeout(next, 600); setInterval(next, RM ? 6000 : 4200);
  }
  function hero() {
    var m = $('media'); if (!m) return;
    if (RM || SAVE || q.get('video') === '0') return slides(); // "reduzir movimento" / economia de dados: nada de vídeo
    var v = D.createElement('video'); v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', ''); v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1; v.preload = 'auto'; v.disablePictureInPicture = true;
    v.poster = 'assets/img/hero-poster.webp'; v.width = 720; v.height = 900;
    var failed = false, fail = function () { if (!failed) { failed = true; slides(); } };
    v.addEventListener('playing', function () { m.classList.add('playing'); }); v.addEventListener('error', fail);
    v.src = 'assets/video/hero.mp4'; m.insertBefore(v, m.querySelector('.badge'));
    var p = v.play(); if (p && p.catch) p.catch(fail);
    setTimeout(function () { if (!m.classList.contains('playing')) fail(); }, 9000); // rede ruim ou autoplay bloqueado sem erro
    D.addEventListener('visibilitychange', function () { if (failed) return; if (D.hidden) v.pause(); else { var r = v.play(); if (r && r.catch) r.catch(function () {}); } });
  }

  // ---------- copiar link ----------
  var toastT; function toast(s) { var e = $('toast'); if (!e) return; e.textContent = s; e.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { e.classList.remove('on'); }, 2600); }
  function copyText(txt, ok, fail) {
    var old = function () { try { var a = D.createElement('textarea'); a.value = txt; a.setAttribute('readonly', ''); a.style.cssText = 'position:fixed;opacity:0'; (D.querySelector('dialog[open]') || D.body).appendChild(a); a.select(); a.setSelectionRange(0, 9999); var r = D.execCommand('copy'); a.remove(); r ? ok() : fail(); } catch (e) { fail(); } };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, old); else old();
  }
  function copy() { var url = S.GAME_URL || location.href; copyText(url, function () { toast(t('copied')); }, function () { toast(t('copyFail') + url); }); }
  D.querySelectorAll('[data-copy]').forEach(function (b) { b.addEventListener('click', copy); });

  // ---------- instalar ----------
  var UA = navigator.userAgent || '', IG = /Instagram|FBAN|FBAV|FB_IAB|FBIOS/i.test(UA) || q.get('ig') === '1', IOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || q.get('ios') === '1', AND = /Android/i.test(UA), deferred = null;
  var ICON = { share: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3m0 0L8 7m4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1"/></svg>', plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg>', dots: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>' };
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; });
  window.addEventListener('appinstalled', function () { deferred = null; toast(t('in.ok')); });
  function steps(kind) {
    var d = $('dlg'); if (!d) return; $('dlgT').textContent = t('in.t');
    $('dlgS').innerHTML = t('in.' + kind).map(function (s) { return '<li><span>' + s.replace(/\{(\w+)\}/g, function (_, k) { return ICON[k] || ''; }) + '</span></li>'; }).join('');
    $('dlgGo').textContent = t('in.go'); $('dlgGo').hidden = kind === 'ig'; d.setAttribute('data-kind', kind);
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
  }
  function install() {
    if (IG) return steps('ig'); // o WebView do Instagram/Facebook não instala PWA
    if (deferred) { var p = deferred; deferred = null; var nope = function () { deferred = p; steps(IOS ? 'ios' : AND ? 'and' : 'pc'); }; try { var pr = p.prompt(); if (pr && pr.catch) pr.catch(nope); } catch (e) { return nope(); } if (p.userChoice) p.userChoice.then(function (r) { if (r && r.outcome === 'accepted') toast(t('in.ok')); }); return; }
    steps(IOS ? 'ios' : AND ? 'and' : 'pc');
  }
  if ($('bInstall')) $('bInstall').addEventListener('click', install);
  if ($('dlgX')) $('dlgX').addEventListener('click', function () { var d = $('dlg'); d.close ? d.close() : d.removeAttribute('open'); });
  if ($('dlg')) $('dlg').addEventListener('click', function (e) { if (e.target === this && this.close) this.close(); });
  if (IG) { D.documentElement.classList.add('ig');
    var o = $('igOpen'); if (o && (AND || q.get('ig') === '1') && S.GAME_URL) { o.hidden = false; o.href = 'intent://' + S.GAME_URL.replace(/^https?:\/\//, '') + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(S.GAME_URL) + ';end'; } }

  // ---------- doação por Pix (config.js > PIX; independe dos anúncios) ----------
  var PX = S.PIX || {}, pixCode = '';
  function pixRender() {
    var box = $('pixQr'); if (!box || !window.Pix) return;
    try { pixCode = window.Pix.payload({ key: PX.KEY, name: PX.NAME, city: PX.CITY }); box.innerHTML = window.Pix.qrSvg(pixCode, t('pix.qr')); } catch (e) { pixCode = ''; box.textContent = t('pix.fail'); }
  }
  function pixOpen() {
    var d = $('pix'); if (!d) return; window.__pixOpen = true;
    $('pixName').textContent = window.Pix ? window.Pix.clean(PX.NAME, 25) : String(PX.NAME || ''); $('pixBank').textContent = PX.BANK ? ' · ' + PX.BANK : ''; $('pixKeyTxt').textContent = PX.KEY || '';
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute('open', '');
    if (window.Pix) return pixRender();
    var s = D.createElement('script'); s.src = (D.querySelector('script[src$="app.js"]').getAttribute('src') || 'assets/app.js').replace(/app\.js.*$/, 'pix.js'); // o gerador só é baixado aqui
    s.onload = function () { $('pixName').textContent = window.Pix.clean(PX.NAME, 25); pixRender(); }; s.onerror = function () { $('pixQr').textContent = t('pix.fail'); }; D.head.appendChild(s);
  }
  function pixDone(btn) { var sp = btn.querySelector('span'), key = sp.getAttribute('data-i'); sp.textContent = t('pix.done'); btn.classList.add('done'); $('pixSay').textContent = t('pix.done'); clearTimeout(btn._t); btn._t = setTimeout(function () { sp.textContent = t(key); btn.classList.remove('done'); $('pixSay').textContent = ''; }, 2200); }
  function pixInit() {
    var on = PX.ENABLED && PX.KEY, sec = $('apoiar'), lk = $('pixLink'); if (sec) sec.hidden = !on; if (lk) lk.hidden = !on; if (!on) return;
    if ($('bPix')) $('bPix').addEventListener('click', pixOpen);
    if ($('pixCopy')) $('pixCopy').addEventListener('click', function () { var b = this; if (!pixCode) return; copyText(pixCode, function () { pixDone(b); }, function () { toast(t('copyFail') + pixCode); }); });
    if ($('pixKey')) $('pixKey').addEventListener('click', function () { var b = this; copyText(PX.KEY, function () { pixDone(b); }, function () { toast(t('copyFail') + PX.KEY); }); });
    if ($('pixX')) $('pixX').addEventListener('click', function () { var d = $('pix'); d.close ? d.close() : d.removeAttribute('open'); });
    if ($('pix')) { $('pix').addEventListener('click', function (e) { if (e.target === this && this.close) this.close(); }); $('pix').addEventListener('close', function () { window.__pixOpen = false; }); }
  }

  // ---------- anúncios (desligados por padrão) + consentimento ----------
  function loadAds(npa) {
    if (loadAds.done) return; loadAds.done = true; window.adsbygoogle = window.adsbygoogle || []; if (npa) window.adsbygoogle.requestNonPersonalizedAds = 1;
    [['adTop', ADS.SLOT_TOP], ['adFoot', ADS.SLOT_FOOTER]].forEach(function (x) { var a = $(x[0]); if (!a || !x[1]) return; a.classList.add('on');
      a.querySelector('.box').innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + esc(ADS.ADSENSE_CLIENT) + '" data-ad-slot="' + esc(x[1]) + '" data-ad-format="horizontal" data-full-width-responsive="false"></ins>'; });
    var s = D.createElement('script'); s.async = true; s.crossOrigin = 'anonymous'; s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADS.ADSENSE_CLIENT);
    s.onload = function () { D.querySelectorAll('ins.adsbygoogle').forEach(function () { try { window.adsbygoogle.push({}); } catch (e) {} }); }; D.head.appendChild(s);
  }
  function consent(v) {
    store.set('emb.consent', v); var g = v === 'yes' ? 'granted' : 'denied';
    window.gtag('consent', 'update', { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: 'denied' });
    var b = $('consent'); if (b) b.remove();
    if (v === 'yes') loadAds(false); else if (ADS.NPA_ON_REFUSE) loadAds(true);
  }
  function askConsent() {
    if ($('consent')) return; var b = D.createElement('div'); b.id = 'consent'; b.className = 'consent'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', t('ft.cookies'));
    b.innerHTML = '<p>' + t('cs.msg') + ' <a href="privacidade.html">' + t('cs.more') + '</a></p><div class="two"><button class="btn ghost" type="button" data-c="no">' + t('cs.no') + '</button><button class="btn" type="button" data-c="yes">' + t('cs.yes') + '</button></div>';
    b.addEventListener('click', function (e) { var c = e.target.closest && e.target.closest('[data-c]'); if (c) consent(c.getAttribute('data-c')); }); D.body.appendChild(b);
  }
  function ads() {
    var on = (ADS.ADS_ENABLED && ADS.ADSENSE_CLIENT) || q.get('adsdemo') === '1'; if (!on) return; // desligado: nenhum script do Google, nenhum aviso, nenhum espaço reservado
    if (q.get('adsdemo') === '1' && !ADS.ADS_ENABLED) { // demonstração local do layout (não chama o Google)
      ['adTop', 'adFoot'].forEach(function (id) { var a = $(id); if (a) { a.classList.add('on'); a.querySelector('.box').innerHTML = '<div style="height:100px;display:grid;place-items:center;color:#8494a8;border:1.5px dashed #3a4a5e;border-radius:10px">[ banner 320×100 — demo ]</div>'; } });
      if (!store.get('emb.consent') || q.get('ask') === '1') askConsent(); loadAds = function () {}; var l0 = $('consentLink'); if (l0) { l0.hidden = false; l0.onclick = function (e) { e.preventDefault(); askConsent(); }; } return; }
    if (ADS.USE_GOOGLE_CMP) return loadAds(false); // a mensagem certificada do Google cuida do consentimento
    var l = $('consentLink'); if (l) { l.hidden = false; l.addEventListener('click', function (e) { e.preventDefault(); askConsent(); }); }
    var c = store.get('emb.consent'); if (c === 'yes') consent('yes'); else if (c === 'no') { if (ADS.NPA_ON_REFUSE) loadAds(true); } else askConsent();
  }

  // ---------- início ----------
  links(); pixInit(); applyLang(); var y = $('yr'); if (y) y.textContent = new Date().getFullYear();
  window.__landing = { lang: function () { return lang; }, install: install, isIG: IG, slides: slides };
  function later() { hero(); ads(); }
  if (D.readyState === 'complete') setTimeout(later, 0); else window.addEventListener('load', function () { setTimeout(later, 0); });
})();
