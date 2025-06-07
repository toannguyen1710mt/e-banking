// Libs
import { renderHook } from '@testing-library/react';

// Constants
import { MESSAGE } from '@/constants';

// Hooks
import { useConfirmationOnLeave } from '@/hooks/useConfirmationOnLeave';

interface MockLink {
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
}

interface MockNodeList {
  [index: number]: MockLink;
  item(index: number): MockLink;
  forEach(
    callback: (
      value: MockLink,
      key: number,
      parent: NodeListOf<Element>,
    ) => void,
  ): void;
  length: number;
}

describe('useConfirmationOnLeave', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;
  let querySelectorAllSpy: jest.SpyInstance;
  let confirmSpy: jest.SpyInstance;
  let mockLinks: MockLink[];

  beforeEach(() => {
    // Mock window event listeners
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    // Mock document.querySelectorAll
    mockLinks = [
      { addEventListener: jest.fn(), removeEventListener: jest.fn() },
      { addEventListener: jest.fn(), removeEventListener: jest.fn() },
    ];

    const nodeList: MockNodeList = {
      0: mockLinks[0],
      1: mockLinks[1],
      length: mockLinks.length,
      item: (index: number) => mockLinks[index],
      forEach: function (
        callback: (
          value: MockLink,
          key: number,
          parent: NodeListOf<Element>,
        ) => void,
      ): void {
        mockLinks.forEach((link, index) =>
          callback(link, index, this as unknown as NodeListOf<Element>),
        );
      },
    };

    querySelectorAllSpy = jest
      .spyOn(document, 'querySelectorAll')
      .mockReturnValue(nodeList as unknown as NodeListOf<HTMLAnchorElement>);

    confirmSpy = jest.spyOn(window, 'confirm');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add event listeners when mounted', () => {
    renderHook(() => useConfirmationOnLeave(false, false));

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function),
    );
    expect(querySelectorAllSpy).toHaveBeenCalledWith('a');
    mockLinks.forEach((link) => {
      expect(link.addEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function),
      );
    });
  });

  it('should remove event listeners when unmounted', () => {
    const { unmount } = renderHook(() => useConfirmationOnLeave(false, false));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function),
    );
    mockLinks.forEach((link) => {
      expect(link.removeEventListener).toHaveBeenCalledWith(
        'click',
        expect.any(Function),
      );
    });
  });

  it('should show confirmation dialog when hasChanges is true', () => {
    renderHook(() => useConfirmationOnLeave(true, false));

    // Get the beforeunload handler
    const beforeUnloadHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'beforeunload',
    )?.[1] as (event: BeforeUnloadEvent) => string | undefined;

    // Create a mock event
    const mockEvent = {
      returnValue: '',
    };

    // Call the handler directly
    const result = beforeUnloadHandler(mockEvent as BeforeUnloadEvent);

    expect(result).toBe(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.returnValue).toBe(MESSAGE.CONFIRM_LEAVING);
  });

  it('should show confirmation dialog when isDirty is true', () => {
    renderHook(() => useConfirmationOnLeave(false, true));

    // Get the beforeunload handler
    const beforeUnloadHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'beforeunload',
    )?.[1] as (event: BeforeUnloadEvent) => string | undefined;

    // Create a mock event
    const mockEvent = {
      returnValue: '',
    };

    // Call the handler directly
    const result = beforeUnloadHandler(mockEvent as BeforeUnloadEvent);

    expect(result).toBe(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.returnValue).toBe(MESSAGE.CONFIRM_LEAVING);
  });

  it('should not show confirmation dialog when both flags are false', () => {
    renderHook(() => useConfirmationOnLeave(false, false));

    // Get the beforeunload handler
    const beforeUnloadHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'beforeunload',
    )?.[1] as (event: BeforeUnloadEvent) => string | undefined;

    // Create a mock event
    const mockEvent = {
      returnValue: '',
    };

    // Call the handler directly
    const result = beforeUnloadHandler(mockEvent as BeforeUnloadEvent);

    expect(result).toBeUndefined();
    expect(mockEvent.returnValue).toBe('');
  });

  it('should prevent link navigation when isDirty is true and user cancels', () => {
    renderHook(() => useConfirmationOnLeave(false, true));

    confirmSpy.mockReturnValue(false);

    const mockEvent: { preventDefault: jest.Mock } = {
      preventDefault: jest.fn(),
    };

    // Get the click handler and call it
    const clickHandler = mockLinks[0].addEventListener.mock.calls[0][1];
    clickHandler(mockEvent);

    expect(confirmSpy).toHaveBeenCalledWith(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should allow link navigation when isDirty is true and user confirms', () => {
    renderHook(() => useConfirmationOnLeave(false, true));

    confirmSpy.mockReturnValue(true);

    const mockEvent: { preventDefault: jest.Mock } = {
      preventDefault: jest.fn(),
    };

    // Get the click handler and call it
    const clickHandler = mockLinks[0].addEventListener.mock.calls[0][1];
    clickHandler(mockEvent);

    expect(confirmSpy).toHaveBeenCalledWith(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('should prevent link navigation when changes exist and user cancels', () => {
    renderHook(() => useConfirmationOnLeave(true, false));

    confirmSpy.mockReturnValue(false);

    const mockEvent: { preventDefault: jest.Mock } = {
      preventDefault: jest.fn(),
    };

    // Get the click handler and call it
    const clickHandler = mockLinks[0].addEventListener.mock.calls[0][1];
    clickHandler(mockEvent);

    expect(confirmSpy).toHaveBeenCalledWith(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('should allow link navigation when changes exist and user confirms', () => {
    renderHook(() => useConfirmationOnLeave(true, false));

    confirmSpy.mockReturnValue(true);

    const mockEvent: { preventDefault: jest.Mock } = {
      preventDefault: jest.fn(),
    };

    // Get the click handler and call it
    const clickHandler = mockLinks[0].addEventListener.mock.calls[0][1];
    clickHandler(mockEvent);

    expect(confirmSpy).toHaveBeenCalledWith(MESSAGE.CONFIRM_LEAVING);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });
});
