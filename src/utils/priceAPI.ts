const API_TIMEOUT = 2000; // ms

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
    const timeoutID = setTimeout(() => {
      console.log(`[CRYPTOCOMPARE] Timeout`);
      reject(new Error('Timeout'));
    }, API_TIMEOUT);

    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${req.coinTo}&tsyms=${req.coinFrom}&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`
    )
      .then((res) => {
        clearTimeout(timeoutID);
        if (!res.ok) reject(new Error(`[cryptocompare ERR]: ${res.status}`));
        res.json().then((data) => {
          resolve({
            key: `${req.coinTo}_${req.coinFrom}`,
            value: data[req.coinTo][req.coinFrom],
          });
        });
      })
      .catch((err) => {
        clearTimeout(timeoutID);
        console.log('[cryptocompare ERR] ', err);
        reject(err);
      });
  });
};

export const FetchCoinMarketCapPrice = (
  req: GetPriceRequest
): Promise<PriceResponse> => {
  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      console.log(`[COINMARKETCAP] Timeout`);
      reject(new Error('Timeout'));
    }, API_TIMEOUT);

    fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${req.coinTo}&convert=${req.coinFrom}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
        } as HeadersInit,
      }
    )
      .then((res) => {
        clearTimeout(timeoutID);
        if (!res.ok) reject(new Error(`[coinmarketcap ERR]: ${res.status}`));
        res.json().then((data) => {
          if (
            // Prevents lack of a defined price from delaying the app
            data == null ||
            data.data == null ||
            data.data[req.coinTo.toUpperCase()] == null ||
            data.data[req.coinTo.toUpperCase()][0] == null ||
            data.data[req.coinTo.toUpperCase()][0].quote == null ||
            data.data[req.coinTo.toUpperCase()][0].quote[
              req.coinFrom.toUpperCase()
            ] == null ||
            data.data[req.coinTo.toUpperCase()][0].quote[
              req.coinFrom.toUpperCase()
            ].price == null
          ) {
            reject(
              new Error(
                `[coinmarketcap missing data ERR]: ${JSON.stringify(data)}`
              )
            );
          } else {
            resolve({
              key: `${req.coinTo}_${req.coinFrom}`,
              value:
                data.data[req.coinTo.toUpperCase()][0].quote[
                  req.coinFrom.toUpperCase()
                ].price,
            });
          }
        });
      })
      .catch((err) => {
        clearTimeout(timeoutID);
        console.log('[coinmarketcap ERR] ', err);
        reject(err);
      });
  });
};

export const FetchNextCryptoPriceAPI = (
  req: GetPriceRequest
): Promise<PriceResponse> => {
  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      console.log(`[NEXT API] Timeout`);
      reject(new Error('Timeout'));
    }, API_TIMEOUT);
    console.log(`[NEXT API] ${req.coinTo} ${req.coinFrom}`);

    fetch(`/api/prices/${req.coinTo}/${req.coinFrom}`)
      .then((res) => {
        clearTimeout(timeoutID);
        if (!res.ok) reject(new Error(`[NEXT API ERR]: ${res.status}`));
        res.json().then((data) => {
          resolve({
            key: `${req.coinTo}_${req.coinFrom}`,
            value: data.value,
          });
        });
      })
      .catch((err) => {
        clearTimeout(timeoutID);
        console.log('[NEXT API ERR] ', err);
        reject(err);
      });
  });
};
