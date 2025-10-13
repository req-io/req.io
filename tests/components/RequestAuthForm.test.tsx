import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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

  describe('ApiKey Form', () => {
    const apiKeyAuthProps = {
      ...defaultProps,
      authType: AuthType.ApiKey,
    };

    it('should render key and value input area when Api auth is selected', () => {
      render(<RequestAuthForm {...apiKeyAuthProps} />);

      expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    });

    it('should call onCredentialsChange when key is changed', () => {
      render(<RequestAuthForm {...apiKeyAuthProps} />);

      const keyInput = screen.getByPlaceholderText('Key');
      fireEvent.change(keyInput, { target: { value: 'apiKey' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({ key: 'apiKey', value: '' });
    });

    it('should call onCredentialsChange when value is changed', () => {
      render(<RequestAuthForm {...apiKeyAuthProps} />);

      const valueInput = screen.getByPlaceholderText('Value');
      fireEvent.change(valueInput, { target: { value: 'apiValue' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({ key: '', value: 'apiValue' });
    });

    it('should maintain both key and value state when either is changed', () => {
      render(<RequestAuthForm {...apiKeyAuthProps} />);

      const keyInput = screen.getByPlaceholderText('Key');
      const valueInput = screen.getByPlaceholderText('Value');

      fireEvent.change(keyInput, { target: { value: 'apiKey' } });
      fireEvent.change(valueInput, { target: { value: 'apiValue' } });

      expect(mockOnCredentialsChange).toHaveBeenCalledWith({ key: 'apiKey', value: 'apiValue' });
    });
  });
});
