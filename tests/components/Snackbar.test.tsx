import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SnackBar from '../../src/components/Snackbar';
import '@testing-library/jest-dom';

describe('SnackBar Component', () => {
  // Test case 1: Renders SnackBar with a message
  it('should render SnackBar with a given message', () => {
    render(<SnackBar message="Test message" open={true} vertical="bottom" horizontal="right" />);
    const messageElement = screen.getByText('Test message');
    expect(messageElement).toBeInTheDocument();
  });

  // Test case 2: Does not display SnackBar when open is false
  it('should not display SnackBar when open is false', () => {
    render(<SnackBar message="Test message" open={false} vertical="bottom" horizontal="right" />);
    const messageElement = screen.queryByText('Test message');
    expect(messageElement).not.toBeInTheDocument();
  });

  // Test case 3: Applies default position (bottom-right) when not specified
  it('should position SnackBar at bottom-right by default', () => {
    render(<SnackBar message="Position test" open={true} />);
    const snackbarElement = screen.getByText('Position test').closest('.MuiSnackbar-root');
    expect(snackbarElement).toHaveClass('MuiSnackbar-anchorOriginBottomRight');
  });

  // Test case 4: Applies custom position when specified
  it('should position SnackBar at top-left when specified', () => {
    render(<SnackBar message="Position test" open={true} vertical="top" horizontal="left" />);
    const snackbarElement = screen.getByText('Position test').closest('.MuiSnackbar-root');
    expect(snackbarElement).toHaveClass('MuiSnackbar-anchorOriginTopLeft');
  });
});
