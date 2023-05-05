import { render, screen } from '@testing-library/react';

import { Main } from './Main';

describe('Main template', () => {
  describe('Render method', () => {
    it('should have 2 menu items', () => {
      render(<Main meta={null}>{null}</Main>);

      const menuItemList = screen.getAllByRole('listitem');

      expect(menuItemList).toHaveLength(2);
    });

    it('should contain children', () => {
      render(<Main meta={null}>{null}</Main>);

      const main = screen.getByTestId('MainTemplate');
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass('h-full w-full antialiased');

      const header = screen.getByRole('navigation');
      expect(header).toBeInTheDocument();
      const content = screen.getByRole('main');
      expect(content).toBeInTheDocument();
    });
  });
});
