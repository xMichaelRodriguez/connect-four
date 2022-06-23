import React from 'react';
import { describe, expect, it, vitest } from 'vitest';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AcepMatched } from '../../../../features/home/components/AcepMatched';

/**
 * @vitest-environment jsdom
 */
describe('Test on <AceptMatched/>', () => {
  const onAcept: () => void = vitest.fn();
  const onRejected: () => void = vitest.fn();

  const component = render(<AcepMatched onAcepted={onAcept} onRejected={onRejected} />);

  it('The component should be defined', () => {
    expect(component.container).toBeDefined();
  });

  it('The Accept button should work', async () => {
    await act(async () => {
      await userEvent.click(component.getByText('Accept'));
    });
    expect(onAcept).toHaveBeenCalled();
  });
  it('The Reject button should work', async () => {
    await act(async () => {
      await userEvent.click(component.getByText('Reject'));
    });
    expect(onRejected).toHaveBeenCalled();
  });
});
