import type { ReactNode } from 'react';

import HeaderNav from '@/components/HeaderNav';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="bgBody w-full text-gray-700 antialiased ">
    {props.meta}
    <div className=" flex h-full w-full items-start justify-center">
      <div className="outerShadow relative my-12 max-w-2xl rounded-xl">
        <header className="w-full rounded-t  border-2">
          <HeaderNav />
        </header>
        <div className="mx-auto px-4">
          <main className="content py-5 text-xl">{props.children}</main>
        </div>
      </div>
    </div>
  </div>
);

export { Main };
