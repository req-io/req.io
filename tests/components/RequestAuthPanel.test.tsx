import RequestAuthPanel from '../../src/components/RequestAuthPanel';
import { AuthType } from '../../src/components/RequestAuthPanel/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DropdownProps } from '../../src/components/Dropdown/types';
import { act } from 'react-dom/test-utils';
import { RequestAuthFormProps } from '../../src/components/RequestAuthForm/types';

const mockedComponents = {
  dropDown: {} as DropdownProps,
  requestAuthFormProps: {} as RequestAuthFormProps,
};

describe('RequestAuthPanel', () => {
  const mockOnAuthChange = vi.fn();

  vi.mock('../../src/components/Dropdown', () => ({
    default: (props: DropdownProps) => {
      mockedComponents.dropDown = props;
      return <div data-testid='drop-down'> </div>;
    },
  }));

  vi.mock('../../src/components/RequestAuthForm', () => ({
    default: (props: RequestAuthFormProps) => {
      mockedComponents.requestAuthFormProps = props;
      return <div data-testid={'request-auth-form'}></div>;
    },
  }));

  const defaultProps = {
    onAuthChange: mockOnAuthChange,
  };

  it('should render Dropdown and RequestAuthForm by default', () => {
    render(<RequestAuthPanel {...defaultProps} />);

    expect(screen.getByTestId('drop-down')).toBeInTheDocument();
    expect(screen.getByTestId('request-auth-form')).toBeInTheDocument();
  });

  it('should pass AuthType to RequestAuthForm when different AuthType selection', async () => {
    render(<RequestAuthPanel {...defaultProps} />);

    await act(async () => {
      const basicAuth = mockedComponents.dropDown.items[1];
      basicAuth.onSelect();
    });

    expect(mockedComponents.requestAuthFormProps.authType).toBe(AuthType.BasicAuth);

    await act(async () => {
      const apiKeyAuth = mockedComponents.dropDown.items[2];
      apiKeyAuth.onSelect();
    });

    expect(mockedComponents.requestAuthFormProps.authType).toBe(AuthType.ApiKey);
  });

  it('should call onAuthChange when credentials are changed', async () => {
    render(<RequestAuthPanel {...defaultProps} />);

    await act(async () => {
    mockedComponents.dropDown.items[1].onSelect(); // Select Basic Auth
    })
    mockedComponents.requestAuthFormProps.onCredentialsChange({username: 'testuser', password: ''});

    expect(mockOnAuthChange).toHaveBeenCalledWith({
      authType: AuthType.BasicAuth,
      username: 'testuser',
      password: '',
    });
  });
});
