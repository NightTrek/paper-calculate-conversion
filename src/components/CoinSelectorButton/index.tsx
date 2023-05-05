/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import * as React from 'react';

import { COINS } from '@/config/CoinConfig';

const isFloat = (n: string): boolean => {
  // handle the case where a person has typed the first decimal place
  if (n.length > 1 && n[n.length - 1] === '.') {
    return /^-?\d*\.?\d+$/.test(`${n}0`);
  }
  return /^-?\d*\.?\d+$/.test(n);
};

type ISelectionModalProps = {
  coinNameSelector: boolean;
  coinList: string[];
  setCoinNameSelector: (open: boolean) => void;
  setCoinName: (name: string) => void;
};

const CoinSelectionModal = (props: ISelectionModalProps) => {
  if (!props.coinNameSelector) return <div />;
  return (
    <div className="no-scrollbar absolute left-0 top-[92px] z-20 flex h-[256px] w-full flex-col content-evenly justify-start overflow-y-scroll rounded-2xl border-2 border-paperBlue-100 bg-paperBlue-300 shadow-md">
      {props.coinList.map((coinName, index) => {
        if (!coinName) return <div key={index} />;
        return (
          <div
            key={index}
            className="my-1 flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 hover:bg-paperBlue-400 active:bg-paperBlue-400"
            onClick={() => {
              props.setCoinName(coinName);
              props.setCoinNameSelector(false);
            }}
          >
            <div className="flex items-center pl-2">
              <Image
                src={COINS[coinName]?.coinIcon || '/TokenIcons/ETHIcon.svg'}
                alt={coinName}
                width={48}
                height={48}
                className="pr-4"
              />
              <div className="flex flex-col items-start justify-between">
                <span className="px-1 text-paperWhite-100">
                  {COINS[coinName]?.coinName}
                </span>
                <span className="px-1 text-base text-gray-500">
                  {COINS[coinName]?.coinTicker}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

type ISelectorBoxProps = {
  coinName: string | null;
  setCoinName: (coinName: string) => void;
  setInputChange: (input: string) => void;
  inputState: string;
  coinList: string[];
  isInput: boolean;
};
const CoinSelectorButton = (props: ISelectorBoxProps) => {
  const [coinNameSelector, setCoinNameSelector] =
    React.useState<boolean>(false);

  if (props.coinName && COINS[props.coinName]) {
    return (
      <div className="relative flex w-full flex-col items-start py-2">
        <div className="my-2 flex w-full items-center justify-between">
          <div className="flex items-center">
            {/* Hover Button */}
            <div
              className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-paperWhite-100 p-2 hover:bg-paperWhite-200 active:bg-paperWhite-200"
              onClick={() => {
                setCoinNameSelector(!coinNameSelector);
              }}
            >
              <Image
                src={
                  COINS[props.coinName]?.coinIcon || '/TokenIcons/ETHIcon.svg'
                }
                alt="ETH"
                width={32}
                height={32}
                className=" pr-2"
              />
              <span className="px-1 text-paperBlue-400">
                {COINS[props.coinName]?.coinTicker || 'ETH'}
              </span>
              <Image
                src="/Icons/Cheveron-Down.svg"
                alt="down"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
        {props.isInput && (
          <div className="mt-4 flex w-full items-center justify-between px-2">
            <span className="px-1 pr-3 text-xl text-paperWhite-100 sm:text-3xl">
              From
            </span>
            <div className="flex items-center">
              {' '}
              <input
                id="input-id"
                className="max-w-[184px] bg-paperBlue-300 p-2 text-right text-xl text-paperWhite-100 focus:border-0 sm:max-w-[320px] sm:text-3xl"
                type="text"
                name="ETH"
                placeholder="0.0"
                value={props.inputState}
                onChange={(event: { target: { value: string } }) => {
                  if (!isFloat(event.target.value)) return;
                  props.setInputChange(event.target.value);
                }}
              />
              <span className="px-2 text-xl font-semibold text-paperWhite-100 sm:text-3xl">
                {COINS[props.coinName]?.coinTicker || 'ETH'}
              </span>
            </div>
          </div>
        )}

        <CoinSelectionModal
          coinList={props.coinList}
          coinNameSelector={coinNameSelector}
          setCoinName={props.setCoinName}
          setCoinNameSelector={(open: boolean) => {
            setCoinNameSelector(open);
          }}
        />
      </div>
    );
  }
  return (
    <div className="relative flex w-full flex-col items-start py-2">
      <div className="my-2 flex w-full items-center justify-between">
        <div className="flex items-center">
          {/* Hoverable Button */}
          <div
            className="ml-1 flex cursor-pointer items-center justify-center rounded-full  bg-paperWhite-100 p-2 hover:bg-paperWhite-200 active:bg-paperWhite-200"
            onClick={() => {
              setCoinNameSelector(!coinNameSelector);
            }}
          >
            <div className="mr-2 h-[24px] w-[24px] rounded-full bg-paperBlue-400 opacity-20" />
            <span className="px-1 text-paperBlue-500">Choose Coin</span>
            <Image
              src="/Icons/Cheveron-Down.svg"
              alt="down"
              width={24}
              height={24}
            />
          </div>
          {/*  */}
        </div>
      </div>
      <CoinSelectionModal
        coinList={props.coinList}
        coinNameSelector={coinNameSelector}
        setCoinName={props.setCoinName}
        setCoinNameSelector={(open: boolean) => {
          setCoinNameSelector(open);
        }}
      />
    </div>
  );
};

export default CoinSelectorButton;
