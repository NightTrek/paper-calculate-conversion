import Error from 'next/error';

export interface GetPriceRequest {
  coinTo: string;
  coinFrom: string;
}

export interface PriceResponse {
  key: string;
  value: string;
}

export const FetchCryptoComparePrice = (
  req: GetPriceRequest
): Promise<PriceResponse> => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${req.coinTo}&tsyms=${req.coinFrom}&api_key=${process.env.NEXT_PUBLIC_CRYPTOCOMPARE_API_KEY}`
    )
      .then((res) => {
        if (!res.ok)
          reject(new Error(`[cryptocompare ERR]: ${res.status}` as any));
        res.json().then((data) => {
          resolve({
            key: `${req.coinTo}_${req.coinFrom}`,
            value: data[req.coinTo][req.coinFrom],
          });
        });
      })
      .catch((err) => {
        console.log('[cryptocompare ERR] ', err);
        reject(err);
      });
  });
};
