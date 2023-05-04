import type { NextApiRequest, NextApiResponse } from 'next';

import {
  FetchCoinMarketCapPrice,
  FetchCryptoComparePrice,
} from '../../../utils/priceAPI';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query || req.query.slug?.length !== 2) {
    res
      .status(404)
      .json({ error: 'Invalid request method add params', request: req.query });
    return;
  }

  const coinTo = req.query.slug[0] || 'ETH';
  const coinFrom = req.query.slug[1] || 'USD';
  console.log(`[API] ${coinTo} ${coinFrom}`);

  FetchCoinMarketCapPrice({ coinTo, coinFrom })
    .then((cmcData) => {
      console.log('[COINMARKETCAP] ', cmcData);
      res.status(200).json(cmcData);
    })
    .catch((err) => {
      console.log('[COINMARKETCAP ERR] ', err);
      console.log('========== FALLING BACK TO CRYPTOCOMPARE ==========');
      FetchCryptoComparePrice({ coinTo, coinFrom })
        .then((ccData) => {
          console.log('[CRYPTOCOMPARE] ', ccData);
          res.status(200).json(ccData);
        })
        .catch((cryptocompareERR) => {
          console.log('[CRYPTOCOMPARE] ', cryptocompareERR);
          res.status(500).json({ error: 'Internal server error' });
        });
    });
}
