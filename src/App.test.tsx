import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Search as a child', () => {
  render(<App />);
  const searchWrapper = screen.getByTestId(/searchWrapper/i);
  expect(searchWrapper).toBeInTheDocument();
});
