import { render, screen } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('<TaskItem/>', () => {
  test('Displays all props', () => {
    render(
      <TaskItem
        title="test title"
        location="New York"
        time="08-10-2022"
        cash="123"
        xp="1500"
        icon="img/src/test.png"
      />
    );
    expect(screen.getByText('test title')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('08-10-2022')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('1500')).toBeInTheDocument();
  });
});
