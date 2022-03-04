import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';

describe('<Radio/>', () => {
  test('renders without errors', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
  test('changes checked state', () => {
    render(<Radio onChange={() => {}} checked />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
  });
  test('calls onChange', () => {
    const mockOnChange = jest.fn();
    render(<Radio onChange={mockOnChange} checked={false} />);
    const radio = screen.getByRole('radio');
    userEvent.click(radio);
    expect(mockOnChange).toBeCalled();
  });
  test('calls onClick', () => {
    const mockOnClick = jest.fn();
    render(<Radio onClick={mockOnClick} checked={false} />);
    const radio = screen.getByRole('radio');
    userEvent.click(radio);
    expect(mockOnClick).toBeCalled();
  });
  test('displays label', () => {
    render(<Radio label="test label" />);
    expect(screen.getByText('test label')).toBeInTheDocument();
  });
});
