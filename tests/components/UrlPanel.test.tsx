// UrlPanel.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import UrlPanel from '../../src/components/UrlPanel';
import { describe, it, expect, vi } from 'vitest';

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

  it('renders input with correct value', () => {
    setup();
    const input = screen.getByPlaceholderText('https://example.com');
    expect(input).toHaveValue('https://test.com');
  });

  it('calls onUrlChange when typing in input', () => {
    const { onUrlChange } = setup();
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'https://new.com' } });
    expect(onUrlChange).toHaveBeenCalledWith('https://new.com');
  });

  it('calls onSend when pressing Enter in input', () => {
    const { onSend } = setup();
    const input = screen.getByRole('textbox');

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalled();
  });

  it('calls onSend when clicking Send button', () => {
    const { onSend } = setup();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(onSend).toHaveBeenCalled();
  });

  it('Dropdown is rendered in the screen', () => {
    setup();

    expect(screen.getByTestId('dropdown')).toBeInTheDocument();  
  });

  it('open the dropdown when clicking on it', () => {
    setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    expect(dropdown.querySelector('.dropdown-menu')).toBeInTheDocument();
  });

  it('calls onMethodChange when selecting a method from dropdown', () => {
    const { onMethodChange } = setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    const postItem = screen.getByText('POST');
    fireEvent.click(postItem);

    expect(onMethodChange).toHaveBeenCalledWith('POST');
  });

  it('closes dropdown when clicking outside', () => {
    setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    expect(dropdown.querySelector('.dropdown-menu')).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();
  });

  it('calls onMethodChange when selecting PATCH method from dropdown', () => {
    const { onMethodChange } = setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    const patchItem = screen.getByText('PATCH');
    fireEvent.click(patchItem);

    expect(onMethodChange).toHaveBeenCalledWith('PATCH');
  });

  it('calls onMethodChange when selecting PUT method from dropdown', () => {
    const { onMethodChange } = setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    const putItem = screen.getByText('PUT');
    fireEvent.click(putItem);

    expect(onMethodChange).toHaveBeenCalledWith('PUT');
  });

  it('calls onMethodChange when selecting DELETE method from dropdown', () => {
    const { onMethodChange } = setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    const deleteItem = screen.getByText('DELETE');
    fireEvent.click(deleteItem);

    expect(onMethodChange).toHaveBeenCalledWith('DELETE');
  });

  it('calls onMethodChange when reselecting GET method after selecting any other method from dropdown', () => {
    const { onMethodChange } = setup();

    const dropdown = screen.getByTestId('dropdown');
    const selected = dropdown.querySelector('.dropdown-selected');

    expect(dropdown.querySelector('.dropdown-menu')).not.toBeInTheDocument();

    if (selected) {
      fireEvent.click(selected);
    }

    const postItem = screen.getByText('POST');
    fireEvent.click(postItem);

    expect(onMethodChange).toHaveBeenCalledWith('POST');

    if (selected) {
      fireEvent.click(selected);
    }

    const getItem = screen.getByText('GET');
    fireEvent.click(getItem);

    expect(onMethodChange).toHaveBeenCalledWith('GET');
  });
});
