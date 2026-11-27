// JCL — página do jogo: idiomas, vídeo e botão da demo.
(function () {
  'use strict';
  var DEMO_URL = 'demo/'; // quando a demo estiver publicada, coloque o endereço aqui (ex.: 'demo/')
  var D = document, $ = function (id) { return D.getElementById(id); }, q = new URLSearchParams(location.search);
  var T = {
    pt: { title: 'JCL — survival horror stealth em desenvolvimento (alfa) | By Franciomar Silva', badge: 'ALFA', tag: 'Eles observam. Eles esperam.', sub: 'Sobrevivência furtiva numa ilha onde os predadores pensam. Um soldado, uma pistola e quase nenhuma munição.',
      'video.aria': 'Arte conceitual em vídeo: um predador se aproxima na névoa', 'video.pause': 'Pausar', 'video.play': 'Ver vídeo',
      'f.state': 'Fase alfa · build 0.6', 'f.name': 'Nome provisório', 'f.dev': 'Celular, na vertical',
      'game.h': 'O jogo', 'g.1': 'Furtividade de verdade: esconder, esperar e escolher a hora.', 'g.2': 'Pouca munição. Cada tiro conta, e o barulho tem preço.', 'g.3': 'Predadores que observam, aprendem e imitam vozes.', 'g.4': 'Sem mapa e sem indicadores na tela: só os seus olhos e ouvidos.', 'g.5': 'Terceira pessoa por cima do ombro, pensado para dois dedos.', 'g.6': 'Visual retrô: low poly com textura em pixel art e muita névoa.',
      'demo.h': 'Demo alfa', 'demo.lead': 'Um encontro na névoa. A primeira versão jogável está em preparação e vai aparecer aqui.', 'demo.leadOn': 'Um encontro na névoa. É uma versão alfa: falhas e mudanças são esperadas.', 'demo.soon': 'EM BREVE', 'demo.play': 'Jogar a demo',
      'art.h': 'Clima do jogo', 'art.lead': 'Arte conceitual feita com IA para definir a atmosfera. Ainda não são imagens do jogo.', 'art.1': 'Arte conceitual: predador de perto numa floresta com névoa', 'art.2': 'Arte conceitual: corredor escuro com um predador ao fundo', 'art.3': 'Arte conceitual: sobrevivente escondido sob uma maca', 'art.4': 'Arte conceitual: um grande predador invade uma sala',
      'follow.h': 'Acompanhe', 'follow.lead': 'Muita coisa ainda vai mudar. Siga no Instagram para ver o jogo crescer.', 'follow.btn': 'Seguir @frannciomar', back: 'Ver todos os meus games', 'ft.priv': 'Privacidade', 'ft.terms': 'Termos', 'ft.contact': 'Contato (Instagram)', 'ft.made': 'feito no Brasil' },
    en: { title: 'JCL — survival horror stealth in development (alpha) | By Franciomar Silva', badge: 'ALPHA', tag: 'They watch. They wait.', sub: 'Stealth survival on an island where the predators think. One soldier, one pistol and almost no ammo.',
      'video.aria': 'Concept art video: a predator closes in through the fog', 'video.pause': 'Pause', 'video.play': 'Watch video',
      'f.state': 'Alpha stage · build 0.6', 'f.name': 'Working title', 'f.dev': 'Phone, portrait',
      'game.h': 'The game', 'g.1': 'Real stealth: hide, wait and pick your moment.', 'g.2': 'Little ammo. Every shot counts, and noise has a price.', 'g.3': 'Predators that watch, learn and imitate voices.', 'g.4': 'No map and no on-screen markers: only your eyes and ears.', 'g.5': 'Over-the-shoulder third person, designed for two fingers.', 'g.6': 'Retro look: low poly with pixel-art textures and heavy fog.',
      'demo.h': 'Alpha demo', 'demo.lead': 'One encounter in the fog. The first playable version is being built and will show up here.', 'demo.leadOn': 'One encounter in the fog. This is an alpha: expect bugs and changes.', 'demo.soon': 'COMING SOON', 'demo.play': 'Play the demo',
      'art.h': 'Mood', 'art.lead': 'AI-made concept art to define the atmosphere. These are not in-game images yet.', 'art.1': 'Concept art: a predator up close in a foggy forest', 'art.2': 'Concept art: a dark corridor with a predator at the far end', 'art.3': 'Concept art: a survivor hiding under a hospital bed', 'art.4': 'Concept art: a huge predator breaks into a room',
      'follow.h': 'Follow along', 'follow.lead': 'A lot will still change. Follow on Instagram to watch the game grow.', 'follow.btn': 'Follow @frannciomar', back: 'See all my games', 'ft.priv': 'Privacy', 'ft.terms': 'Terms', 'ft.contact': 'Contact (Instagram)', 'ft.made': 'made in Brazil' },
    es: { title: 'JCL — survival horror de sigilo en desarrollo (alfa) | By Franciomar Silva', badge: 'ALFA', tag: 'Observan. Esperan.', sub: 'Supervivencia sigilosa en una isla donde los depredadores piensan. Un soldado, una pistola y casi sin munición.',
      'video.aria': 'Video de arte conceptual: un depredador se acerca entre la niebla', 'video.pause': 'Pausar', 'video.play': 'Ver video',
      'f.state': 'Fase alfa · build 0.6', 'f.name': 'Nombre provisional', 'f.dev': 'Móvil, en vertical',
      'game.h': 'El juego', 'g.1': 'Sigilo de verdad: esconderse, esperar y elegir el momento.', 'g.2': 'Poca munición. Cada disparo cuenta y el ruido tiene un precio.', 'g.3': 'Depredadores que observan, aprenden e imitan voces.', 'g.4': 'Sin mapa ni indicadores en pantalla: solo tus ojos y oídos.', 'g.5': 'Tercera persona sobre el hombro, pensado para dos dedos.', 'g.6': 'Estilo retro: low poly con texturas en pixel art y mucha niebla.',
      'demo.h': 'Demo alfa', 'demo.lead': 'Un encuentro en la niebla. La primera versión jugable está en preparación y aparecerá aquí.', 'demo.leadOn': 'Un encuentro en la niebla. Es una versión alfa: habrá fallos y cambios.', 'demo.soon': 'PRÓXIMAMENTE', 'demo.play': 'Jugar la demo',
      'art.h': 'Ambiente', 'art.lead': 'Arte conceptual hecho con IA para definir la atmósfera. Todavía no son imágenes del juego.', 'art.1': 'Arte conceptual: un depredador de cerca en un bosque con niebla', 'art.2': 'Arte conceptual: un pasillo oscuro con un depredador al fondo', 'art.3': 'Arte conceptual: un superviviente escondido bajo una camilla', 'art.4': 'Arte conceptual: un gran depredador irrumpe en una sala',
      'follow.h': 'Síguelo', 'follow.lead': 'Todavía va a cambiar mucho. Sígueme en Instagram para ver crecer el juego.', 'follow.btn': 'Seguir @frannciomar', back: 'Ver todos mis juegos', 'ft.priv': 'Privacidad', 'ft.terms': 'Términos', 'ft.contact': 'Contacto (Instagram)', 'ft.made': 'hecho en Brasil' }
  };
  // mesma escolha de idioma da página inicial
  function get() { try { return localStorage.getItem('emb.lang'); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem('emb.lang', v); } catch (e) {} }
  function pick() {
    var l = q.get('lang') || get(); if (l && T[l]) return l;
    var n = navigator.languages || [navigator.language || 'pt'];
    for (var i = 0; i < n.length; i++) { var c = String(n[i]).slice(0, 2).toLowerCase(); if (T[c]) return c; }
    return 'en';
  }
  var lang = pick(), v = $('teaser'), b = $('bVideo');
  function videoLabel() { b.textContent = T[lang][v.paused ? 'video.play' : 'video.pause']; }
  function apply() {
    var t = T[lang]; D.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang; D.title = t.title;
    D.querySelectorAll('[data-i]').forEach(function (e) { var k = e.getAttribute('data-i'); if (k === 'demo.lead' && DEMO_URL) k = 'demo.leadOn'; if (e !== b) e.textContent = t[k]; });
    D.querySelectorAll('[data-i-aria]').forEach(function (e) { e.setAttribute('aria-label', t[e.getAttribute('data-i-aria')]); });
    D.querySelectorAll('[data-i-alt]').forEach(function (e) { e.alt = t[e.getAttribute('data-i-alt')]; });
    D.querySelectorAll('[data-lang-btn]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-lang-btn') === lang)); });
    videoLabel();
  }
  D.querySelectorAll('[data-lang-btn]').forEach(function (x) { x.addEventListener('click', function () { lang = x.getAttribute('data-lang-btn'); set(lang); apply(); }); });
  if (DEMO_URL) { $('demoGo').href = DEMO_URL; $('demoGo').hidden = false; $('demoSoon').hidden = true; }
  function play() { var p = v.play(); if (p && p.catch) p.catch(videoLabel); }
  b.hidden = false; v.addEventListener('play', videoLabel); v.addEventListener('pause', videoLabel);
  b.addEventListener('click', function () { if (v.paused) play(); else v.pause(); });
  apply();
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) play();
})();
