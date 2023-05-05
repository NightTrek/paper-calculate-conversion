export type Coin = {
  coinName: string;
  coinTicker: string;
  coinPrice: string;
  coinIcon: string;
};

export type CoinType = {
  [key: string]: Coin;
};

export const COINS: CoinType = {
  BTC: {
    coinName: 'Bitcoin',
    coinTicker: 'BTC',
    coinPrice: '100000',
    coinIcon: '/TokenIcons/bitcoin.svg',
  },
  ETH: {
    coinName: 'Ethereum',
    coinTicker: 'ETH',
    coinPrice: '4000',
    coinIcon: '/TokenIcons/ETHIcon.svg',
  },
  USD: {
    coinName: 'US Dollar',
    coinTicker: 'USD',
    coinIcon: '/TokenIcons/DollarIcon.svg',
    coinPrice: '1',
  },
  MATIC: {
    coinName: 'Polygon',
    coinTicker: 'MATIC',
    coinPrice: '5',
    coinIcon: '/TokenIcons/Polygon.png',
  },
  AVAX: {
    coinName: 'Avalanche',
    coinTicker: 'AVAX',
    coinPrice: '100',
    coinIcon: '/TokenIcons/avax.png',
  },
  USDC: {
    coinName: 'USD Coin',
    coinTicker: 'USDC',
    coinPrice: '1',
    coinIcon: '/TokenIcons/USDCIcon.svg',
  },
  DAI: {
    coinName: 'Dai',
    coinTicker: 'DAI',
    coinPrice: '0.9998',
    coinIcon: '/TokenIcons/DAIIcon.svg',
  },
};
