import { render, screen } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';
import Button from 'components/Button';

describe('<ButtonGroup/>', () => {
  test('renders without errors', () => {
    render(
      <ButtonGroup>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });
});
