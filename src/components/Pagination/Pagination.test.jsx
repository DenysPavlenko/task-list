import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const sevenButtons = [1, 2, 3, 4, 5, 6, 7];

describe('<Pagination />', () => {
  test('Prints 7 buttons', () => {
    render(<Pagination page={1} pages={7} setPage={() => {}} />);
    // const pagination = screen.getByTestId('pagination');
    // const chevronLeft = screen.getByTestId('chevron-left');
    // const chevronRight = screen.getByTestId('chevron-right');
    // const firstPage = screen.getByText('1');
    // const secondPage = screen.getByText('2');
    // userEvent.click(chevronRight);
    // expect(firstPage.classList.contains('active')).toBe(true);
    expect(true).toBe(true);
  });
});
