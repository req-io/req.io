import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RequestParamsPanel from '../../src/components/RequestParamsPanel';
import '@testing-library/jest-dom';

describe('RequestParamsPanel', () => {
  vi.mock('@mui/icons-material/Delete', () => ({
    default: () => <div data-testid="delete-icon" />,
  }));

  const mockParams = [
    { key: 'param1', value: 'value1' },
    { key: 'param2', value: 'value2' },
  ];

  const mockOnParamsChange = vi.fn();
  const mockOnNewParamAddition = vi.fn();

  const defaultProps = {
    params: mockParams,
    onParamsChange: mockOnParamsChange,
    onNewParamAddition: mockOnNewParamAddition,
  };

  it('should render the given parameters with its associated delete button', () => {
    render(<RequestParamsPanel {...defaultProps} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();

    expect(screen.getAllByPlaceholderText('Key')).toHaveLength(2);
    expect(screen.getAllByPlaceholderText('Value')).toHaveLength(2);

    expect(screen.getByDisplayValue('param1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('param2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('value2')).toBeInTheDocument();

    const deleteButtons = screen.getAllByTestId('delete-icon');
    expect(deleteButtons).toHaveLength(2);
  });

  it('should add a new parameter entry with empty key and value', () => {
    render(<RequestParamsPanel {...defaultProps} />);

    fireEvent.click(screen.getByText('Add Param'));
    expect(mockOnNewParamAddition).toHaveBeenCalledWith({ key: '', value: '' });
  });

  it('should update the parameter entry when the key is changed', () => {
    render(<RequestParamsPanel {...defaultProps} />);

    const firstKeyInput = screen.getAllByPlaceholderText('Key')[0];
    fireEvent.change(firstKeyInput, { target: { value: 'newKey' } });

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      { key: 'newKey', value: 'value1' },
      { key: 'param2', value: 'value2' },
    ]);
  });

  it('should update the parameter entry when the value is changed', () => {
    render(<RequestParamsPanel {...defaultProps} />);

    const firstValueInput = screen.getAllByPlaceholderText('Value')[0];
    fireEvent.change(firstValueInput, { target: { value: 'newValue' } });

    expect(mockOnParamsChange).toHaveBeenCalledWith([
      { key: 'param1', value: 'newValue' },
      { key: 'param2', value: 'value2' },
    ]);
  });

  it('should delete the parameter entry when the associated delete button is pressed', () => {
    render(<RequestParamsPanel {...defaultProps} />);

    const deleteButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(deleteButtons[0]);

    expect(mockOnParamsChange).toHaveBeenCalledWith([{ key: 'param2', value: 'value2' }]);
  });
});
