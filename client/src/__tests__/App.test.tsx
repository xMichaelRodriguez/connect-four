import { render } from '@testing-library/react';
import { AuthPage } from '../features/Auth/pages/AuthPage';

describe('Test on Login Screen', () => {
  it('The component should be defined', () => {
    const component = render(<AuthPage />);
    const { container } = component;

    expect(container).toBeDefined();
  });
});
