import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import AppBody from '../../src/components/AppBody';
import '@testing-library/jest-dom';
import { UrlPanelProps } from '../../src/components/UrlPanel/types';
import { RequestPanelProps } from '../../src/components/RequestPanel/types';
import { ResponsePanelProps } from '../../src/components/ResponsePanel/types';
import { PaneSplitterProps } from '../../src/components/PaneSplitter';
import { AuthType } from '../../src/components/RequestAuthPanel/types';

type MockedComponents = {
  urlPanel: UrlPanelProps | null;
  requestPanel: RequestPanelProps | null;
  responsePanel: ResponsePanelProps | null;
  paneSplitter: PaneSplitterProps | null;
};

const mockedComponents: MockedComponents = {
  urlPanel: null,
  requestPanel: null,
  responsePanel: null,
  paneSplitter: null,
};

describe(`AppBody`, () => {
  beforeAll(() => {
    vi.mock('../../src/components/UrlPanel/index.tsx', () => ({
      default: (props: UrlPanelProps) => {
        mockedComponents.urlPanel = props;
        return <div data-testid="url-panel" />;
      },
    }));

    vi.mock('../../src/components/RequestPanel/index.tsx', () => ({
      default: (props: RequestPanelProps) => {
        mockedComponents.requestPanel = props;
        return <div data-testid="request-panel" />;
      },
    }));

    vi.mock('../../src/components/ResponsePanel/index.tsx', () => ({
      default: (props: ResponsePanelProps) => {
        mockedComponents.responsePanel = props;
        return <div data-testid="response-panel" />;
      },
    }));

    vi.mock('../../src/components/PaneSplitter/index.tsx', () => ({
      default: (props: PaneSplitterProps) => {
        mockedComponents.paneSplitter = props;
        return <div data-testid="pane-splitter" />;
      },
    }));

    vi.mock('../../src/api/rest.ts', () => ({
      get: vi.fn().mockResolvedValue({ status: 200, statusText: 'OK', data: 'get response' }),
      post: vi
        .fn()
        .mockResolvedValue({ status: 201, statusText: 'Created', data: 'post response' }),
      put: vi.fn().mockResolvedValue({ status: 200, statusText: 'OK', data: 'put response' }),
      patch: vi.fn().mockResolvedValue({ status: 200, statusText: 'OK', data: 'patch response' }),
      delete_req: vi
        .fn()
        .mockResolvedValue({ status: 204, statusText: 'No Content', data: 'delete response' }),
    }));
  });

  beforeEach(() => {
    render(<AppBody />);
  });

  it('should render the AppBody Component with its sub components', () => {
    expect(screen.getByTestId('app-body')).toBeInTheDocument();
    expect(screen.getByTestId('url-panel')).toBeInTheDocument();
    expect(screen.getByTestId('response-panel')).toBeInTheDocument();
    expect(screen.getByTestId('pane-splitter')).toBeInTheDocument();
    expect(screen.getByTestId('request-panel')).toBeInTheDocument();
  });

  it(`should pass the required props to its sub-components`, () => {
    // This test now checks that the props are defined on the mocked components
    expect(mockedComponents.urlPanel?.onSend).toBeInstanceOf(Function);
    expect(mockedComponents.requestPanel?.method).toBeDefined();
    expect(mockedComponents.responsePanel?.isLoading).toBeDefined();
    expect(mockedComponents.paneSplitter?.direction).toBe('horizontal');
  });

  it('should update ResponsePanel props on GET request', async () => {
    act(() => {
      mockedComponents.urlPanel?.onMethodChange('GET');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(200);
    expect(mockedComponents.responsePanel?.statusText).toBe('OK');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify('get response', null, 2));
  });

  it('should update ResponsePanel props on POST request', async () => {
    act(() => {
      mockedComponents.urlPanel?.onMethodChange('POST');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(201);
    expect(mockedComponents.responsePanel?.statusText).toBe('Created');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify('post response', null, 2));
  });

  it('should update ResponsePanel props on PUT request', async () => {
    act(() => {
      mockedComponents.urlPanel?.onMethodChange('PUT');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(200);
    expect(mockedComponents.responsePanel?.statusText).toBe('OK');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify('put response', null, 2));
  });

  it('should update ResponsePanel props on PATCH request', async () => {
    act(() => {
      mockedComponents.urlPanel?.onMethodChange('PATCH');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(200);
    expect(mockedComponents.responsePanel?.statusText).toBe('OK');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify('patch response', null, 2));
  });

  it('should update ResponsePanel props on DELETE request', async () => {
    act(() => {
      mockedComponents.urlPanel?.onMethodChange('DELETE');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(204);
    expect(mockedComponents.responsePanel?.statusText).toBe('No Content');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify('delete response', null, 2));
  });

  it(`should update ResponsePanel props on API error`, async () => {
    const { get } = await import('../../src/api/rest.ts');
    (get as any).mockRejectedValueOnce({
      response: {
        status: 404,
        statusText: 'Not Found',
        data: { message: 'Resource not found' },
      },
    });

    act(() => {
      mockedComponents.urlPanel?.onMethodChange('GET');
      mockedComponents.urlPanel?.onUrlChange('https://example.com/nonexistent');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(404);
    expect(mockedComponents.responsePanel?.statusText).toBe('Not Found');
    expect(mockedComponents.responsePanel?.response).toBe(JSON.stringify({ message: 'Resource not found' }, null, 2));
  });

  it(`should update ResponsePanel props on network error`, async () => {
    const { get } = await import('../../src/api/rest.ts');
    (get as any).mockRejectedValueOnce({
      message: 'Network Error',
      code: 'ERR_NETWORK',
    });

    act(() => {
      mockedComponents.urlPanel?.onMethodChange('GET');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      expect(mockedComponents.responsePanel?.isLoading).toBe(false);
    });

    expect(mockedComponents.responsePanel?.statusCode).toBe(0);
    expect(mockedComponents.responsePanel?.statusText).toBe('ERROR: NETWORK_FAILURE');
    expect(mockedComponents.responsePanel?.response).toBe('Error: Network Error');
  });

  it('should use updated data from RequestPanel callbacks in API calls', async () => {
    const { post } = await import('../../src/api/rest.ts');

    act(() => {
      mockedComponents.urlPanel?.onMethodChange('POST');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');

      mockedComponents.requestPanel?.onBodyChange('{"my_key":"my_value"}');

      mockedComponents.requestPanel?.onHeadersChange([
        { key: 'X-Custom-Header', value: 'header-value' },
      ]);

      mockedComponents.requestPanel?.onParamsChange([
        { key: 'param1', value: 'value1' },
      ]);

      mockedComponents.requestPanel?.onCredentialsChange({
        authType: AuthType.BasicAuth,
        username: 'testuser',
        password: 'testpassword',
      });
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      const expectedUrl = 'https://example.com?param1=value1';
      const expectedBody = { my_key: 'my_value' };
      const expectedHeaders = expect.arrayContaining([
        { key: 'X-Custom-Header', value: 'header-value' },
        { key: 'Authorization', value: btoa('Basic testuser:testpassword') },
      ]);

      expect(post).toHaveBeenCalledWith(expectedUrl, expectedBody, expectedHeaders);
    });
  });

  it('should add new header and parameter via RequestPanel callbacks', async () => {
    const { get } = await import('../../src/api/rest.ts');

    act(() => {
      mockedComponents.urlPanel?.onMethodChange('GET');
      mockedComponents.urlPanel?.onUrlChange('https://example.com');

      mockedComponents.requestPanel?.onNewHeaderAddition({ key: 'X-New-Header', value: 'new-value' });

      mockedComponents.requestPanel?.onNewParamAddition({ key: 'newParam', value: 'newValue' });
    });

    act(() => {
      mockedComponents.urlPanel?.onSend();
    });

    await waitFor(() => {
      const expectedUrl = 'https://example.com?newParam=newValue';
      const expectedHeaders = expect.arrayContaining([
        { key: 'X-New-Header', value: 'new-value' },
      ]);

      expect(get).toHaveBeenCalledWith(expectedUrl, expectedHeaders);
    });
  });
});
