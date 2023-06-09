/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';

type ISwapProps = {
  handleSwapButton: () => void;
};
const SwapButton = (props: ISwapProps) => {
  return (
    <div className="my-4 mb-6 flex w-full flex-nowrap items-center justify-between">
      <div className="h-[1px] w-1/3 bg-slate-500 opacity-20" />
      <div
        className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-paperBlue-100 shadow"
        onClick={props.handleSwapButton}
        onKeyDown={props.handleSwapButton}
        role="button"
        tabIndex={-1}
      >
        <Image src="/Icons/Swap.svg" alt="swap" width={32} height={32} />
      </div>
      <div className="h-[1px] w-1/3 bg-slate-500 opacity-20" />
    </div>
  );
};

export default SwapButton;
