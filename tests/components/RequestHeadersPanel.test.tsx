import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RequestHeadersPanel from '../../src/components/RequestHeadersPanel';
import '@testing-library/jest-dom';

describe('RequestHeadersPanel', () => {
  vi.mock('@mui/icons-material/Delete', () => ({
    default: () => <div data-testid="delete-icon" />,
  }));

  const mockHeaders = [
    { key: 'header1', value: 'value1' },
    { key: 'header2', value: 'value2' },
  ];

  const mockOnHeadersChange = vi.fn();
  const mockOnNewHeaderAddition = vi.fn();

  const defaultProps = {
    headers: mockHeaders,
    onHeadersChange: mockOnHeadersChange,
    onNewHeaderAddition: mockOnNewHeaderAddition,
  };

  it('should render the given headers with its associated delete button', () => {
    render(<RequestHeadersPanel {...defaultProps} />);

    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    expect(screen.getAllByPlaceholderText('Key')).toHaveLength(2);
    expect(screen.getAllByPlaceholderText('Value')).toHaveLength(2);

    expect(screen.getByDisplayValue('header1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('header2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value2')).toBeInTheDocument();

    const deleteButtons = screen.getAllByTestId('delete-icon');
    expect(deleteButtons).toHaveLength(2);
  });

  it('should add a new header entry with empty key and value', () => {
    render(<RequestHeadersPanel {...defaultProps} />);

    fireEvent.click(screen.getByText('Add Header'));
    expect(mockOnNewHeaderAddition).toHaveBeenCalledWith({ key: '', value: '' });
  });

  it('should update the header entry when the key is changed', () => {
    render(<RequestHeadersPanel {...defaultProps} />);

    const firstKeyInput = screen.getAllByPlaceholderText('Key')[0];
    fireEvent.change(firstKeyInput, { target: { value: 'newKey' } });

    expect(mockOnHeadersChange).toHaveBeenCalledWith([
      { key: 'newKey', value: 'value1' },
      { key: 'header2', value: 'value2' },
    ]);
  });

  it('should update the header entry when the value is changed', () => {
    render(<RequestHeadersPanel {...defaultProps} />);

    const firstValueInput = screen.getAllByPlaceholderText('Value')[0];
    fireEvent.change(firstValueInput, { target: { value: 'newValue' } });

    expect(mockOnHeadersChange).toHaveBeenCalledWith([
      { key: 'header1', value: 'newValue' },
      { key: 'header2', value: 'value2' },
    ]);
  });

  it('should delete the header entry when the associated delete button is pressed', () => {
    render(<RequestHeadersPanel {...defaultProps} />);

    const deleteButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(deleteButtons[0]);

    expect(mockOnHeadersChange).toHaveBeenCalledWith([{ key: 'header2', value: 'value2' }]);
  });
});
