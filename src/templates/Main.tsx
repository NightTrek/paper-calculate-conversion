import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="h-full w-full antialiased " data-testid="MainTemplate">
    {props.meta}
    <div className="flex h-full w-full items-center justify-center">
      <div className=" relative my-12 h-full w-full max-w-2xl rounded-xl  border-paperBlue-100 sm:mt-24 sm:border-2 lg:max-w-4xl">
        <header className=" w-full ">
          <HeaderNav />
        </header>
        <div className="mx-auto h-full bg-paperBlue-300 px-6 pb-12 sm:rounded-b-[12px] sm:px-12">
          <main className="content py-5 text-xl">{props.children}</main>
        </div>
      </div>
    </div>
  </div>
);

export { Main };
