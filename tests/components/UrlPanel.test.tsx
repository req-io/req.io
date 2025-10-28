// UrlPanel.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import UrlPanel from '../../src/components/UrlPanel';
import { describe, it, expect, vi } from 'vitest';
import { DropdownProps } from '../../src/components/Dropdown/types';

let mockedDropdown = {} as DropdownProps;
// UrlPanel.test.tsx
describe('UrlPanel', () => {
  const setup = () => {
    const onMethodChange = vi.fn();
    const onSend = vi.fn();
    const onUrlChange = vi.fn();

    render(
      <UrlPanel
        url="https://test.com"
        onMethodChange={onMethodChange}
        onSend={onSend}
        onUrlChange={onUrlChange}
      />
    );

    return { onMethodChange, onSend, onUrlChange };
  };

  vi.mock('../../src/components/Dropdown', () => {
    return {
      default: (props: DropdownProps) => {
        mockedDropdown = props;
      return (
        <div data-testid="dropdown"></div>
      );
      }
    }
  })

  it('should render input with correct value', () => {
    setup();
    const input = screen.getByPlaceholderText('https://example.com');
    expect(input).toHaveValue('https://test.com');
  });

  it('should call onUrlChange when typing in input', () => {
    const { onUrlChange } = setup();
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'https://new.com' } });
    expect(onUrlChange).toHaveBeenCalledWith('https://new.com');
  });

  it('should call onSend when pressing Enter in input', () => {
    const { onSend } = setup();
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalled();
  });

  it('should call onSend when clicking Send button', () => {
    const { onSend } = setup();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(onSend).toHaveBeenCalled();
  });

  it('should render Dropdown in the screen', () => {
    setup();

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();  
  });

  it('should call onMethodChange when selecting a method from dropdown', () => {
    const { onMethodChange } = setup();

    const postItem = mockedDropdown.items[1];
    postItem.onSelect();

    expect(onMethodChange).toHaveBeenCalledWith('POST');
  });

  it('should call onMethodChange when selecting PATCH method from dropdown', () => {
    const { onMethodChange } = setup();

    const patchItem = mockedDropdown.items[2];
    patchItem.onSelect();

    expect(onMethodChange).toHaveBeenCalledWith('PATCH');
  });

  it('should call onMethodChange when selecting PUT method from dropdown', () => {
    const { onMethodChange } = setup();

    const putItem = mockedDropdown.items[3];
    putItem.onSelect();

    expect(onMethodChange).toHaveBeenCalledWith('PUT');
  });

  it('should call onMethodChange when selecting DELETE method from dropdown', () => {
    const { onMethodChange } = setup();

    const deleteItem = mockedDropdown.items[4];
    deleteItem.onSelect();

    expect(onMethodChange).toHaveBeenCalledWith('DELETE');
  });

  it('should call onMethodChange when reselecting GET method after selecting any other method from dropdown', () => {
    const { onMethodChange } = setup();

    const getItem = mockedDropdown.items[0];
    getItem.onSelect();

    expect(onMethodChange).toHaveBeenCalledWith('GET');
  });
});
