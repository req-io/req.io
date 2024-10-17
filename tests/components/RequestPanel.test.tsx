import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RequestPanel from '../../src/components/RequestPanel';
import '@testing-library/jest-dom';

vi.mock('../../src/components/Editor', () => ({
  default: () => <div data-testid="editor">Editor</div>,
}));
vi.mock('../../src/components/Navbar', () => ({
  default: ({ items }) => (
    <div data-testid="navbar">
      {items.map((item) => (
        <button key={item.name} onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}));
vi.mock('../../src/components/RequestHeadersPanel', () => ({
  default: () => <div data-testid="headers-panel">Headers Panel</div>,
}));
vi.mock('../../src/components/RequestParamsPanel', () => ({
  default: () => <div data-testid="params-panel">Params Panel</div>,
}));

describe('RequestPanel', () => {
  const mockProps = {
    method: 'POST',
    body: 'Test body',
    headers: [],
    params: [],
    onBodyChange: vi.fn(),
    onHeadersChange: vi.fn(),
    onNewHeaderAddition: vi.fn(),
    onParamsChange: vi.fn(),
    onNewParamAddition: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the request panel properly with initial state', () => {
    render(<RequestPanel {...mockProps} />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('editor')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Params')).toBeInTheDocument();
  });

  it('should display empty request body placeholder for GET requests', () => {
    render(<RequestPanel {...mockProps} method="GET" />);

    expect(screen.getByText('No body required for GET requests!')).toBeInTheDocument();
    expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
  });

  it('should switch to headers panel when Headers button in navbar is clicked', () => {
    render(<RequestPanel {...mockProps} />);

    fireEvent.click(screen.getByText('Headers'));
    expect(screen.getByTestId('headers-panel')).toBeInTheDocument();
    expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
  });

  it('should switch to params panel when Params button in navbar is clicked', () => {
    render(<RequestPanel {...mockProps} />);

    fireEvent.click(screen.getByText('Params'));
    expect(screen.getByTestId('params-panel')).toBeInTheDocument();
    expect(screen.queryByTestId('editor')).not.toBeInTheDocument();
  });

  it('shoule switch back to body panel when Body navbar button is clicked', () => {
    render(<RequestPanel {...mockProps} />);

    fireEvent.click(screen.getByText('Headers'));
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByTestId('editor')).toBeInTheDocument();
  });
});
