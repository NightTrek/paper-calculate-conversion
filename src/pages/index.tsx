/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import * as React from 'react';

import CoinSelectorButton from '@/components/CoinSelectorButton';
import SwapButton from '@/components/SwapButtonDivider/SwapButtonDivider';
import { COINS } from '@/config/CoinConfig';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

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
    selectorB: { coinName: null, inputState: '' },
    selection: Object.keys(COINS),
  });

  const [prices, setPrices] = React.useState<IPriceState>({
    USD_USD: '1',
  });

  React.useEffect(() => {
    // fetch the prices somehow
    // return the prices
    setPrices({ ...prices, USD_USD: '1' });
  }, [prices, state.selectorA.coinName, state.selectorB.coinName]);

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
      <div className="flex h-full  w-full flex-col justify-between">
        <div className="flex h-1/2 w-full flex-col items-start justify-start py-4 pb-2">
          <div className="pb-4 text-2xl font-bold">From</div>
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
        {/*  Pricing Notation */}
        {state.selectorA.coinName && state.selectorB.coinName && (
          <div className="flex w-full items-center justify-start p-2">
            <Image src="/Icons/Info.svg" alt="info" width={24} height={24} />
            <span className="px-2">{`1 ${state.selectorB.coinName} = ${
              prices[
                `${state.selectorB.coinName}_${state.selectorA.coinName}`
              ] || '0'
            } ${state.selectorA.coinName}`}</span>
          </div>
        )}
      </div>
    </Main>
  );
};

export default Swap;
