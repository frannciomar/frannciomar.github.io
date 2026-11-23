// CONFIGURAÇÃO DO SITE — único lugar para trocar links.
window.SITE = {
  GAME_URL: 'https://frannciomar.github.io/everest-motor-bike/', // para onde vão o banner e o botão JOGAR AGORA
  INSTAGRAM: 'https://instagram.com/frannciomar',
  HANDLE: '@frannciomar',
  LANGS: ['pt', 'en', 'es'],
  // DOAÇÃO POR PIX ("Apoiar o desenvolvimento"). O QR Code e o "copia e cola" são gerados destes dados.
  PIX: {
    ENABLED: true,                                   // false = some com a seção, o link do rodapé e o painel
    KEY: '16ab03db-95f4-46dc-81db-287ca115d55d',     // chave aleatória (pública, só para doações)
    NAME: 'FRANCIOMAR SILVA',                        // nome do recebedor (até 25 letras, sem acento)
    CITY: 'BRASIL',                                  // cidade (até 15 letras, sem acento)
    BANK: 'PicPay'                                   // só aparece no texto, para a pessoa conferir no app do banco
  }
};
