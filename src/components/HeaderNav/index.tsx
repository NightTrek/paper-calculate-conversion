import Image from 'next/image';
import * as React from 'react';

// import Rocketship, { RocketshipSize } from '../Rocketship';

// import PrettyAccount from '../PrettyAccount';

const HeaderNav = () => {
  return (
    <nav className="bg-paperBlue-300 p-4 px-6 sm:rounded-t-[12px] sm:px-12 sm:pt-12">
      <ul className="flex flex-wrap items-center justify-between text-xl">
        <li className="pl-2 text-xl font-semibold text-paperWhite-100 sm:text-3xl md:text-4xl">
          Crypto Price Calculator
        </li>
        <li className="mr-2">
          <Image
            src="/paper-logo-icon.svg"
            alt="Paper-Logo"
            width={20}
            height={24}
          />
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
