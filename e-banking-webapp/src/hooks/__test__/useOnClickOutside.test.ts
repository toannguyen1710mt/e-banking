// Libs
import { fireEvent, renderHook } from '@testing-library/react';

// Hooks
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

describe('useOnClickOutside', () => {
  let handler: jest.Mock;
  let element: HTMLDivElement;

  beforeEach(() => {
    handler = jest.fn();
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    jest.clearAllMocks();
  });

  it('should call handler when click is outside the element', () => {
    renderHook(() => useOnClickOutside({ current: element }, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when click is inside the element', () => {
    renderHook(() => useOnClickOutside({ current: element }, handler));

    fireEvent.mouseDown(element);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should not call handler when ref is null', () => {
    renderHook(() => useOnClickOutside({ current: null }, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() =>
      useOnClickOutside({ current: element }, handler),
    );

    unmount();

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();
  });

  it('should call handler when touch is outside the element', () => {
    renderHook(() => useOnClickOutside({ current: element }, handler));

    fireEvent.touchStart(document.body); // Touch outside
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not call handler when touch is inside the element', () => {
    renderHook(() => useOnClickOutside({ current: element }, handler));

    fireEvent.touchStart(element); // Touch inside
    expect(handler).not.toHaveBeenCalled();
  });
});
