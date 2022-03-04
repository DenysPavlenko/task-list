import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('<Checkbox/>', () => {
  test('renders without errors', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('changes checked state', () => {
    render(<Checkbox onChange={() => {}} checked />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
  test('calls onChange', () => {
    const mockOnChange = jest.fn();
    render(<Checkbox onChange={mockOnChange} checked />);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(mockOnChange).toBeCalled();
  });
  test('displays label', () => {
    render(<Checkbox label="test label" />);
    expect(screen.getByText('test label')).toBeInTheDocument();
  });
});
