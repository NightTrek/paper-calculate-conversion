import * as React from 'react';

import Rocketship, { RocketshipSize } from '../Rocketship';

// import PrettyAccount from '../PrettyAccount';

const HeaderNav = () => {
  return (
    <nav className="border-b border-slate-300 p-4">
      <ul className="flex flex-wrap items-center justify-between text-xl">
        <li className="pl-2">Convert Crypto</li>
        <li className="">
          <Rocketship size={RocketshipSize.SMALL} />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
