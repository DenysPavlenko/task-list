import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('<Button/>', () => {
  test('renders without errors', () => {
    render(<Button variant="primary" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
