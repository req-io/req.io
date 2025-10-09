import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RequestAuthForm from '../../src/components/RequestAuthForm';
import { AuthType } from '../../src/components/RequestAuthPanel/types';
import '@testing-library/jest-dom';

describe('RequestAuthForm', () => {
  const mockOnCredentialsChange = vi.fn();

  const defaultProps = {
    authType: AuthType.NoAuth,
    onCredentialsChange: mockOnCredentialsChange,
  };

  it('should render no auth message when auth type is NoAuth', () => {
    render(<RequestAuthForm {...defaultProps} />);
    expect(screen.getByText('Select authentication type!')).toBeInTheDocument();
  });

  it('should render unsupported message for unsupported auth types', () => {
    render(<RequestAuthForm {...defaultProps} authType={AuthType.ApiKey} />);
    expect(
      screen.getByText('Selected authentication type is not supported yet!')
    ).toBeInTheDocument();
  });

  describe('BasicAuth Form', () => {
    const basicAuthProps = {
      ...defaultProps,
      authType: AuthType.BasicAuth,
    };

    it('should render username and password inputs for BasicAuth', () => {
      render(<RequestAuthForm {...basicAuthProps} />);

      expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('should call onCredentialsChange when username is changed', () => {
      render(<RequestAuthForm {...basicAuthProps} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      fireEvent.change(usernameInput, { target: { value: 'testuser' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({
        username: 'testuser',
        password: '',
      });
    });

    it('should call onCredentialsChange when password is changed', () => {
      render(<RequestAuthForm {...basicAuthProps} />);

      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({
        username: '',
        password: 'testpass',
      });
    });

    it('should maintain both username and password state when either is changed', () => {
      render(<RequestAuthForm {...basicAuthProps} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');

      fireEvent.change(usernameInput, { target: { value: 'testuser' } });
      fireEvent.change(passwordInput, { target: { value: 'testpass' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'testpass',
      });
    });
  });
});
