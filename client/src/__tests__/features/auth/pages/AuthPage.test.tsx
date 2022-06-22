import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { AuthPage } from '../../../../features/Auth/pages/AuthPage';

/**
 * @vitest-environment jsdom
 */
describe('Test on Login Screen', () => {
  it('The component should be defined', () => {
    const component = render(<AuthPage />);
    const { container } = component;

    expect(container).toBeDefined();
  });
});
