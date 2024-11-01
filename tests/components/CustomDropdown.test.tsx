import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dropdown from '../../src/components/CustomDropdown';
import '@testing-library/jest-dom';

describe('Dropdown Component', () => {
  // Test case 1: Renders Dropdown with options
  it('should render all provided options in the Dropdown', () => {
    const methods = ['Method 1', 'Method 2', 'Method 3'];
    render(<Dropdown methods={methods} onSelect={() => {}} />);

    methods.forEach((method) => {
      expect(screen.getByText(method)).toBeInTheDocument();
    });
  });

  // Test case 2: Calls onSelect when an option is selected
  it('should call onSelect with the correct value when an option is selected', () => {
    const methods = ['Method 1', 'Method 2', 'Method 3'];
    const mockOnSelect = vi.fn();
    render(<Dropdown methods={methods} onSelect={mockOnSelect} />);

    // Select 'Method 2'
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Method 2' } });
    expect(mockOnSelect).toHaveBeenCalledWith('Method 2');
  });

  // Test case 3: Renders Dropdown with no options when methods array is empty
  it('should render an empty Dropdown when no methods are provided', () => {
    render(<Dropdown methods={[]} onSelect={() => {}} />);

    expect(screen.getByRole('combobox').children).toHaveLength(0);
  });
});
