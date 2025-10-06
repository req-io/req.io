import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResponseHeadersPanel from '../../src/components/ResponseHeadersPanel';
import '@testing-library/jest-dom';

describe('ResponseHeadersPanel', () => {
  vi.mock('@mui/icons-material/Delete', () => ({
    default: () => <div data-testid="delete-icon" />,
  }));

  const mockHeaders = [
    { key: 'header1', value: 'value1' },
    { key: 'header2', value: 'value2' },
  ];

  const defaultProps = {
    headers: mockHeaders,
  };

  it('should render the given headers with its associated delete button', () => {
    render(<ResponseHeadersPanel {...defaultProps} />);

    expect(screen.getByText('header1')).toBeInTheDocument();
    expect(screen.getByText('value1')).toBeInTheDocument();
    expect(screen.getByText('header2')).toBeInTheDocument();
    expect(screen.getByText('value2')).toBeInTheDocument();
  });

  it('should render placeholder message when there are no headers', () => {
    render(<ResponseHeadersPanel headers={[]} />);

    expect(screen.getByText('No headers to display.')).toBeInTheDocument();
  });
});
