import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Slot } from './Slot.js';

describe('Slot', () => {
  it('merges className, style and ref onto its child', () => {
    const ref = createRef<HTMLElement>();
    render(
      <Slot ref={ref} className="a" style={{ color: 'red' }}>
        <a href="/x" className="b" style={{ margin: 0 }}>
          x
        </a>
      </Slot>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('a', 'b');
    expect(link).toHaveStyle({ margin: '0px' });
    expect(ref.current).toBe(link);
  });

  it('runs the child handler, then the slot handler', async () => {
    const calls: string[] = [];
    render(
      <Slot onClick={() => calls.push('slot')}>
        <button type="button" onClick={() => calls.push('child')}>
          go
        </button>
      </Slot>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(calls).toEqual(['child', 'slot']);
  });

  it('skips the child handler when the slot is aria-disabled', async () => {
    const child = vi.fn();
    const slot = vi.fn();
    render(
      <Slot aria-disabled onClick={slot}>
        <a href="/x" onClick={child}>
          x
        </a>
      </Slot>,
    );
    await userEvent.click(screen.getByRole('link'));
    expect(child).not.toHaveBeenCalled();
    expect(slot).toHaveBeenCalledTimes(1);
  });
});
