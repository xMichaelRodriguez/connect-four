import React from 'react';
import { describe, expect, it, vitest } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';

import { AuthView } from '../../../../features/Auth/views/AuthView';
/**
 * @vitest-environment jsdom
 */
describe('Test on <AuthView/>', () => {
  const mockOnSubmit = vitest.fn();
  const { container, getByRole, getByPlaceholderText } = render(
    <AuthView onSubmit={mockOnSubmit} />
  );

  it('The component should be defined', () => {
    expect(container).toBeDefined();
  });

  it('With valid input', async () => {
    await act(async () => {
      await fireEvent.change(getByPlaceholderText(/username/i), { target: { value: 'michael' } });
    });
    await act(async () => {
      fireEvent.click(getByRole('button'));
    });
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('With invalid input: Minimum length should be 4', async () => {
    await act(async () => {
      const userInput = getByPlaceholderText(/username/);
      fireEvent.change(userInput, { target: { value: '123' } });
      fireEvent.blur(userInput);
    });

    expect(container.innerHTML).toMatch('Minimum length should be 4');
  });

  it('With invalid input: Maximum length should be 10', async () => {
    await act(async () => {
      const userInput = getByPlaceholderText(/username/);
      fireEvent.change(userInput, { target: { value: '12345678901' } });
      fireEvent.blur(userInput);
    });
    expect(container.innerHTML).toMatch('Maximum length should be 10');
  });
});
