import React from 'react';
import { describe, expect, it, vitest } from 'vitest';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AcepMatched } from '../../../../features/home/components/AcepMatched';
/**
 * @vitest-environment jsdom
 */
describe('Test on <AceptMatched/>', () => {
  const onAcept = vitest.fn();
  const obj = {
    onRejected: vitest.fn(),
    onClose: vitest.fn(),
  };
  const { onRejected } = obj;
  const component = render(<AcepMatched onAcepted={onAcept} onRejected={onRejected} />);
  it('The component should be defined', () => {
    expect(component.container).toBeDefined();
  });

  it('The accept button should work', async () => {
    await act(async () => {
      await userEvent.click(component.getByText('Accept'));
    });
    expect(onAcept).toHaveBeenCalled();
  });

  it('The Reject button should work', async () => {
    await act(async () => {
      await userEvent.click(component.getByText('Reject'));
    });
    const spyOnReject = vitest.spyOn(obj, 'onRejected');
    const spyOnClose = vitest.spyOn(obj, 'onClose');
    obj.onRejected();
    obj.onClose();
    expect(spyOnReject).toHaveBeenCalled();
    expect(spyOnClose).toHaveBeenCalled();
  });
});
