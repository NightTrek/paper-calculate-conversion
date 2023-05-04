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
    <div className="no-scrollbar absolute left-0 top-[64px] z-20 flex h-[256px] w-full flex-col content-evenly justify-start overflow-y-scroll rounded-2xl bg-white shadow-md">
      {props.coinList.map((coinName) => {
        if (!coinName) return <div key={coinName} />;
        return (
          <div
            key={coinName}
            className="my-1 flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 hover:bg-gray-300 active:bg-gray-300"
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
                className="pr-2"
              />
              <div className="flex flex-col items-start justify-between">
                <span className="px-1 text-black">
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
        <div
          className="my-2 flex w-full items-center justify-between"
          onClick={() => {
            setCoinNameSelector(!coinNameSelector);
          }}
        >
          <div className="flex items-center">
            {/* Hover Button */}
            <div
              className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-slate-200 px-2 py-1 hover:bg-slate-300 active:bg-slate-300"
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
                className="pr-2"
              />
              <span className="px-1 text-slate-600">
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
          <div className="my-2 flex w-auto items-center">
            <input
              id="input-id"
              className="bgBody w-auto min-w-0 px-1 py-2"
              type="text"
              name="ETH"
              placeholder="0.0"
              value={props.inputState}
              onChange={(event: { target: { value: string } }) => {
                if (!isFloat(event.target.value)) return;
                props.setInputChange(event.target.value);
              }}
            />
            <span className="px-1 text-gray-200">
              {COINS[props.coinName]?.coinTicker || 'ETH'}
            </span>
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
            className="ml-1 flex cursor-pointer items-center justify-center rounded-full bg-slate-200 px-2 py-1 hover:bg-slate-300 active:bg-slate-300"
            onClick={() => {
              setCoinNameSelector(!coinNameSelector);
            }}
          >
            <div className="mr-2 h-[24px] w-[24px] rounded-full bg-black opacity-10" />
            <span className="px-1 text-black">Choose Coin</span>
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
