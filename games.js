// LISTA DE JOGOS — para adicionar um jogo novo, copie um bloco e troque os dados.
// status: 'beta' (jogável, mostra botão Jogar) | 'soon' (cartão "Em breve").
// Textos: { pt, en, es }. shots: até 3 imagens (retrato). url: link do jogo. platforms: lojas futuras (aparecem em "Sobre").
window.GAMES = [
  {
    id: 'everest-motor-bike',
    status: 'beta',
    name: 'Everest Motorbike',
    url: (window.SITE || {}).GAME_URL,
    // lojas onde a versão completa vai sair (só rótulos "em breve", sem link, até existirem as páginas das lojas)
    platforms: [
      { name: 'Google Play' },
      { name: 'App Store', note: 'iPhone/iPad' },
      { name: 'Steam' },
      { name: 'Nintendo Switch' }
    ],
    shots: ['assets/img/shot-1.webp', 'assets/img/shot-2.webp', 'assets/img/shot-3.webp'],
    desc: {
      pt: 'Do pico do Everest a um vulcão em erupção: 25,9 km de descida com avalanche, queda de 650 m pelas nuvens, onda gigante, selva e surfe na lava. Manobras, nitro e muita lapada seca.',
      en: 'From the summit of Everest to an erupting volcano: a 25.9 km descent with an avalanche, a 650 m drop through the clouds, a giant wave, jungle and lava surfing. Tricks, nitro and hard crashes.',
      es: 'De la cima del Everest a un volcán en erupción: 25,9 km de descenso con avalancha, caída de 650 m entre las nubes, ola gigante, selva y surf en la lava. Trucos, nitro y buenos porrazos.'
    },
    touch: { pt: 'dedo na tela acelera · arraste para pilotar · toque duplo = nitro (acelera sozinho) · deslize ↓ = empinar (com nitro)', en: 'hold to accelerate · drag to steer · double tap = nitro (speeds up by itself) · swipe ↓ = wheelie (with nitro)', es: 'mantén el dedo para acelerar · arrastra para pilotar · doble toque = nitro (acelera solo) · desliza ↓ = caballito (con nitro)' },
    keys: { pt: 'W/↑ acelera · A/D pilota · Shift nitro · W/↑ em sequência = empinar (só com nitro) · I/K/J/L manobras', en: 'W/↑ accelerate · A/D steer · Shift nitro · tap W/↑ repeatedly = wheelie (nitro only) · I/K/J/L tricks', es: 'W/↑ acelera · A/D pilota · Shift nitro · pulsa W/↑ = caballito (solo con nitro) · I/K/J/L trucos' }
  },
  { id: 'novo-1', status: 'soon', name: { pt: 'Próximo jogo', en: 'Next game', es: 'Próximo juego' }, desc: { pt: 'Já está na bancada. Siga no Instagram para ver os primeiros testes.', en: 'Already on the workbench. Follow on Instagram to see the first tests.', es: 'Ya está en el taller. Sígueme en Instagram para ver las primeras pruebas.' } },
  { id: 'novo-2', status: 'soon', name: { pt: 'Em segredo', en: 'Top secret', es: 'En secreto' }, desc: { pt: 'Uma ideia maluca de cada vez.', en: 'One crazy idea at a time.', es: 'Una idea loca a la vez.' } }
];
