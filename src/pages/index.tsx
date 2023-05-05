/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import * as React from 'react';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import LinearProgressBar from '@/components/LinearProgressBar/LinearProgressBar';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { COINS } from '@/config/CoinConfig';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { FetchNextCryptoPriceAPI } from '@/utils/priceAPI';

type ISelectorState = {
  coinName: string | null;
  inputState: string;
};

type ISwapState = {
  selectorA: ISelectorState;
  selectorB: ISelectorState;
  selection: string[];
};

type IPriceState = { [key: string]: string };

const Swap = () => {
  const [state, setState] = React.useState<ISwapState>({
    selectorA: { coinName: null, inputState: '' },
    selectorB: { coinName: null, inputState: '0.0' },
    selection: Object.keys(COINS),
  });

  const [prices, setPrices] = React.useState<IPriceState>({
    USD_USD: '1',
  });

  const [refresh, setRefresh] = React.useState<number>(3);

  // interval system
  React.useEffect(() => {
    const interval = setInterval(() => {
      // keep reducing refresh until it hits zero and stop
      if (refresh > 0 && refresh !== 0) {
        setRefresh(refresh - 1);
      }
    }, 1000);
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [refresh]);

  // price fetching API handler
  React.useEffect(() => {
    if (state.selectorA.coinName == null || state.selectorB.coinName == null)
      return;
    const coinFrom = state.selectorA.coinName;
    const coinTo = state.selectorB.coinName;
    if (!prices[`${coinTo}_${coinFrom}`] || refresh < 1) {
      // if the price has never been searched seach it and reset the refresh
      // if the refresh is down to 0 also search it.
      FetchNextCryptoPriceAPI({ coinFrom, coinTo })
        .then((data) => {
          if (data.key !== `${coinTo}_${coinFrom}`)
            throw new Error('api error my b');
          setRefresh(30);
          setPrices({
            ...prices,
            [data.key]: data.value,
          });
        })
        .catch((err) => {
          console.log('API ERR', err);
          setRefresh(10);
        });
    }
  }, [prices, state.selectorA.coinName, state.selectorB.coinName, refresh]);

  // Math and conversion Handler
  React.useEffect(() => {
    if (state.selectorA.coinName == null || state.selectorB.coinName == null)
      return;
    if (
      parseFloat(state.selectorA.inputState) > 0 &&
      prices[`${state.selectorB.coinName}_${state.selectorA.coinName}`]
    ) {
      const outputPrice =
        Math.floor(
          (parseFloat(state.selectorA.inputState) /
            parseFloat(
              prices[
                `${state.selectorB.coinName}_${state.selectorA.coinName}`
              ] || '0'
            )) *
            10000
        ) / 10000;
      if (state.selectorB.inputState === `${outputPrice}`) return;
      setState({
        ...state,
        selectorB: {
          ...state.selectorB,
          inputState: `${outputPrice}`,
        },
      });

      if (refresh < 1 && state.selectorB.inputState !== `price refreshing...`) {
        setState({
          ...state,
          selectorB: { ...state.selectorB, inputState: `price refreshing...` },
        });
      }
    }
  }, [state.selectorA, state.selectorB, prices, refresh]);

  const setSelectorInput = (selectorA: boolean, input: string) => {
    if (selectorA) {
      setState({
        ...state,
        selectorA: {
          ...state.selectorA,
          inputState: input,
        },
      });
      return;
    }
    setState({
      ...state,
      selectorB: {
        ...state.selectorB,
        inputState: input,
      },
    });
  };

  const setSelectorCoinName = (selectorA: boolean, coinName: string) => {
    const newSelectionList = state.selection.filter((coin) => {
      if (coin === coinName) return false;
      return true;
    });
    if (selectorA) {
      newSelectionList.push(state.selectorA.coinName as string);
      setState({
        ...state,
        selectorA: {
          ...state.selectorA,
          coinName,
        },
        selection: newSelectionList,
      });
      return;
    }
    newSelectionList.push(state.selectorB.coinName as string);
    setState({
      ...state,
      selectorB: {
        ...state.selectorB,
        coinName,
      },
      selection: newSelectionList,
    });
  };

  const handleSwapButton = () => {
    setState({
      ...state,
      selectorA: state.selectorB,
      selectorB: state.selectorA,
    });
  };

  return (
    <Main
      meta={
        <Meta
          title="Next.js n"
          description="Next js is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <div className="flex h-full  w-full flex-col justify-between ">
        <div className="flex h-1/2 w-full flex-col items-start justify-start">
          <CoinSelectorButton
            coinList={state.selection}
            coinName={state.selectorA.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(true, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(true, input);
            }}
            inputState={state.selectorA.inputState}
            isInput
          />
          {/*  Swap button central area */}
          <SwapButton handleSwapButton={handleSwapButton} />
          {/*  */}

          <CoinSelectorButton
            isInput={false}
            coinList={state.selection}
            coinName={state.selectorB.coinName}
            setCoinName={(coin) => {
              setSelectorCoinName(false, coin);
            }}
            setInputChange={(input) => {
              setSelectorInput(false, input);
            }}
            inputState={state.selectorB.inputState}
          />
        </div>
        <div className="flex h-[92px] w-full items-center px-0 pb-4 pt-6 text-paperWhite-100 sm:px-2">
          {state.selectorB.coinName && (
            <div className="flex w-full items-end justify-between">
              <div className="text-xl font-bold sm:text-3xl ">To</div>
              <div>
                <span className="text-xl sm:text-3xl">
                  {state.selectorB.inputState}{' '}
                </span>
                <span className="px-2 text-xl font-semibold sm:text-3xl">
                  {state.selectorB.coinName}
                </span>
              </div>
            </div>
          )}
        </div>
        {/*  Pricing Disclamer Notation */}
        {state.selectorA.coinName && state.selectorB.coinName && (
          <div className="flex w-full flex-col items-center justify-evenly text-paperBlue-100">
            <div className="flex w-full items-center justify-between p-2 px-0 text-lg sm:px-2 sm:text-xl ">
              <Image src="/Icons/Info.svg" alt="info" width={24} height={24} />
              <span className="px-2">{`1 ${state.selectorB.coinName} = ${
                prices[
                  `${state.selectorB.coinName}_${state.selectorA.coinName}`
                ] || '0'
              } ${state.selectorA.coinName}`}</span>
            </div>
            <div className="flex w-full items-center justify-end px-2 py-1">
              <LinearProgressBar min={0} max={30} value={refresh} rotate />
            </div>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Swap;
