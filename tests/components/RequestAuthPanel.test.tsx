import RequestAuthPanel from '../../src/components/RequestAuthPanel';
import { AuthType } from '../../src/components/RequestAuthPanel/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('RequestAuthPanel', () => {
  const mockOnCredentialsChange = vi.fn();

  const defaultProps = {
    onCredentialsChange: mockOnCredentialsChange,
  };

  it('should render dropdown and no auth message by default', () => {
    render(<RequestAuthPanel {...defaultProps} />);

    expect(screen.getByText('NO AUTH')).toBeInTheDocument();
    expect(screen.getByText('Select authentication type!')).toBeInTheDocument();
  });

  it('should change auth type when a different option is selected', () => {
    render(<RequestAuthPanel {...defaultProps} />);

    const dropdown = screen.getByText('NO AUTH');
    fireEvent.click(dropdown);

    const basicAuthOption = screen.getByText('BASIC AUTH');
    fireEvent.click(basicAuthOption);

    expect(screen.getByText('BASIC AUTH')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should call onCredentialsChange with BasicAuth', () => {
    render(<RequestAuthPanel {...defaultProps} />);

    const dropdown = screen.getByText('NO AUTH');
    fireEvent.click(dropdown);

    const basicAuthOption = screen.getByText('BASIC AUTH');
    fireEvent.click(basicAuthOption);

    const usernameInput = screen.getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(mockOnCredentialsChange).toHaveBeenCalledWith({
      authType: AuthType.BasicAuth,
      username: 'testuser',
      password: '',
    });
  });

  it('should reset to no auth when No Auth is selected', () => {
    render(<RequestAuthPanel {...defaultProps} />);
    const dropdown = screen.getByText('NO AUTH');
    fireEvent.click(dropdown);

    const basicAuthOption = screen.getByText('BASIC AUTH');
    fireEvent.click(basicAuthOption);
    fireEvent.click(dropdown);

    const noAuthOption = screen.getByText('NO AUTH');
    fireEvent.click(noAuthOption);

    expect(screen.getByText('NO AUTH')).toBeInTheDocument();
    expect(screen.getByText('Select authentication type!')).toBeInTheDocument();
  });
});
