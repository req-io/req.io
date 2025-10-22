import { beforeAll, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ResponsePanel from '../../src/components/ResponsePanel';
import { NavbarProps } from '../../src/components/Navbar/types';

const mockedComponents = {
  navbar: {} as NavbarProps,
  spinner: {},
  editor: {},
  emptyPlaceholder: {},
  responseHeadersPanel: {},
  snakebar: {},
};

describe(`ResponsePanel`, () => {
  const defaultProps = {
    isLoading: false,
    isNoRequestTriggered: false,
    response: '',
    headers: [],
    statusCode: 0,
    statusText: '',
    timeTaken: 0,
  };

  beforeAll(() => {
    vi.mock('../../src/components/Navbar', () => ({
      default: (props: NavbarProps) => {
        mockedComponents.navbar = props;
        return <div data-testid="navbar">Navbar Component</div>;
      },
    }));

    vi.mock('../../src/components/Spinner', () => ({
      default: () => <div data-testid="spinner"></div>,
    }));

    vi.mock('../../src/components/Editor', () => ({
      default: () => <div data-testid="editor">Editor Component</div>,
    }));

    vi.mock('../../src/components/EmptyPlaceholder', () => ({
      default: () => <div data-testid="empty-placeholder">EmptyPlaceholder Component</div>,
    }));

    vi.mock('../../src/components/ResponseHeadersPanel', () => ({
      default: () => <div data-testid="response-headers-panel">ResponseHeadersPanel Component</div>,
    }));

    vi.mock('../../src/components/Snackbar', () => ({
      default: () => <div data-testid="snackbar">Snackbar Component</div>,
    }));

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  describe(`Default Rendering components`, () => {
    it(
      'should render Navbar and EmptyPlaceholder when and isLoading is false and isNoRequestTriggered is true',
      () => {
        const props = {
          isLoading: false,
          isNoRequestTriggered: true,
        };

        render(<ResponsePanel {...defaultProps} {...props} />);
        const navbar = screen.queryByTestId('navbar');
        const emptyPlaceholder = screen.queryByTestId('empty-placeholder');

        expect(navbar).toBeInTheDocument();
        expect(emptyPlaceholder).toBeInTheDocument();
      }
    );

    it(`should render Navbar and Spinner when isLoading is true`, () => {
      const props = {
        isLoading: true,
      };

      render(<ResponsePanel {...defaultProps} {...props} />);
      const spinner = screen.queryByTestId('spinner');
      const navbar = screen.queryByTestId('navbar');

      expect(navbar).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();
    });

    it(
      'should render Navbar and Editor when response is string and not loading or no request triggered',
      () => {
        const props = {
          isLoading: false,
          isNoRequestTriggered: false,
          response: 'This is a test response',
        };
        render(<ResponsePanel {...defaultProps} {...props} />);
        const navbar = screen.queryByTestId('navbar');
        const editor = screen.queryByTestId('editor');

        expect(navbar).toBeInTheDocument();
        expect(editor).toBeInTheDocument();
      }
    );
  });

  describe(`Testing badge functionality`, () => {
    it('should pass header count as badge to Headers tab when headers are present', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'Test response',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Cache-Control', value: 'no-cache' },
        ],
      };

      render(<ResponsePanel {...defaultProps} {...props} />);
      
      expect(mockedComponents.navbar.items).toBeDefined();
      const headersItem = mockedComponents.navbar.items.find(item => item.name === 'headers');
      expect(headersItem?.badge).toBe(2);
    });

    it('should not show badge when no headers are present', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'Test response',
        headers: [],
      };

      render(<ResponsePanel {...defaultProps} {...props} />);
      
      expect(mockedComponents.navbar.items).toBeDefined();
      const headersItem = mockedComponents.navbar.items.find(item => item.name === 'headers');
      expect(headersItem?.badge).toBeUndefined();
    });
  });

  describe(`Testing special Cases`, () => {
    it(`should handle when response is an blob`, () => {
      const blob = new Blob(['This is a test blob'], { type: 'text/plain' });
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: blob,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const editor = screen.queryByTestId('editor');

      expect(navbar).toBeInTheDocument();
      expect(editor).toBeInTheDocument();
    });

    it(`should handle when response is an object`, () => {
      const responseObject = { message: 'This is a test object' };
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: responseObject,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const editor = screen.queryByTestId('editor');

      expect(navbar).toBeInTheDocument();
      expect(editor).toBeInTheDocument();
    });

    it(`should show 0 B when response is not string, blob or object`, () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 12345,
      };

      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const sizeDisplay = screen.getByTestId('response-size');

      expect(navbar).toBeInTheDocument();
      expect(sizeDisplay).toHaveTextContent(/^0 B$/);
    });

    it('should show 0 B when estimating size of response fails', () => {
      const circularObj: any = {};
      circularObj.self = circularObj; // Create a circular reference

      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: circularObj,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const sizeDisplay = screen.getByTestId('response-size');

      expect(navbar).toBeInTheDocument();
      expect(sizeDisplay).toHaveTextContent(/^0 B$/);
    });

    it(`should show 0 B when response is empty`, () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: '',
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const editor = screen.queryByTestId('editor');
      const sizeDisplay = screen.getByTestId('response-size');

      expect(navbar).toBeInTheDocument();
      expect(editor).toBeInTheDocument();
      expect(sizeDisplay).toHaveTextContent(/^0 B$/);
    });

    it(`should show size in KB when response is larger than 1023 B`, () => {
      const largeText = 'a'.repeat(1024);
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: largeText,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const editor = screen.queryByTestId('editor');
      const sizeDisplay = screen.getByTestId('response-size');

      expect(navbar).toBeInTheDocument();
      expect(editor).toBeInTheDocument();
      expect(sizeDisplay).toHaveTextContent(/^1.00 KB$/);
    });

    it(`should show size in MB when response is larger than 1023 KB`, () => {
      const largeText = 'a'.repeat(1024 * 1024);
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: largeText,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const editor = screen.queryByTestId('editor');
      const sizeDisplay = screen.getByTestId('response-size');

      expect(navbar).toBeInTheDocument();
      expect(editor).toBeInTheDocument();
      expect(sizeDisplay).toHaveTextContent(/^1.00 MB$/);
    });

    it(`should show status code, status text and time taken when status code is not 0`, () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 200,
        statusText: 'OK',
        timeTaken: 123,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');
      const timeElement = statusBar.querySelector('.time-taken');

      expect(navbar).toBeInTheDocument();
      expect(statusElement).toHaveTextContent('200 OK');
      expect(timeElement).toHaveTextContent('0.12s');
    });

    it('should status text and time taken when status code is 0', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 0,
        statusText: 'Network Error',
        timeTaken: 456,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const navbar = screen.queryByTestId('navbar');
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');
      const timeElement = statusBar.querySelector('.time-taken');

      expect(navbar).toBeInTheDocument();
      expect(statusElement).toHaveTextContent('Network Error');
      expect(timeElement).toHaveTextContent('0.46s');
    });

    it('should have "success" in the class name when status code is between 200 and 300', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 200,
        statusText: 'OK',
        timeTaken: 123,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');

      expect(statusElement).toHaveClass('success');
    });

    it('should have "redirect" in the class name when status code is between 300 and 400', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 301,
        statusText: 'Moved Permanently',
        timeTaken: 123,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');

      expect(statusElement).toHaveClass('redirect');
    });

    it('should have "client-error" in the class name when status code is between 400 and 500', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 404,
        statusText: 'Not Found',
        timeTaken: 123,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');

      expect(statusElement).toHaveClass('client-error');
    });

    it('should have "server-error" in the class name when status code is between 500 and 600', () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
        statusCode: 500,
        statusText: 'Internal Server Error',
        timeTaken: 123,
      };
      render(<ResponsePanel {...defaultProps} {...props} />);
      const statusBar = screen.getByTestId('status-bar');
      const statusElement = statusBar.querySelector('.status');

      expect(statusElement).toHaveClass('server-error');
    });
  });

  describe(`User Interactions`, () => {
    it(`should render snackbar when text is copied`, async () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
      };
      render(<ResponsePanel {...defaultProps} {...props} />);

      const copyIcon = screen.getByTestId('ContentCopyIcon');
      expect(copyIcon).toBeInTheDocument();
      fireEvent.click(copyIcon);

      const snackbar = await screen.findByTestId('snackbar');
      expect(snackbar).toBeInTheDocument();
    });

    it(`should not render snackbar when copy to clipboard fails`, async () => {
      Object.assign(navigator, {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error('Copy failed')),
        },
      });

      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
      };
      render(<ResponsePanel {...defaultProps} {...props} />);

      const copyIcon = screen.getByTestId('ContentCopyIcon');
      expect(copyIcon).toBeInTheDocument();
      fireEvent.click(copyIcon);

      const snackbar = screen.queryByTestId('snackbar');
      expect(snackbar).not.toBeInTheDocument();
    });

    it(`should render RawResponseViewer when Raw navbar item is clicked`, () => {
      const props = {
        isLoading: false,
        isNoRequestTriggered: false,
        response: 'This is a test response',
      };
      render(<ResponsePanel {...defaultProps} {...props} />);

      const navbar = screen.getByTestId('navbar');
      expect(navbar).toBeInTheDocument();

      act(() => {
        mockedComponents.navbar.items[1].onClick();
      });

      const rawResponseViewer = screen.queryByTestId('raw-response');
      expect(rawResponseViewer).toBeInTheDocument();
    });
  });
});