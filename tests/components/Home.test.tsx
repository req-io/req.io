import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../src/components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../src/components/Sidebar', () => ({
  default: ({ items }: any) => (
    <div data-testid="sidebar">
      {items.map((item: any, idx: number) => (
        <div
          key={idx}
          data-testid={`sidebar-item-${idx}`}
          className={item.active ? 'active' : ''}
          onClick={item.action}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  ),
}));

vi.mock('../../src/components/AppBody', () => ({
  default: () => <div data-testid="app-body">AppBody</div>,
}));

vi.mock('../../src/components/PaneSplitter', () => ({
  default: ({ direction }: any) => (
    <div data-testid={`splitter-${direction}`}>Splitter-{direction}</div>
  ),
}));

describe('Home Component (9)', () => {
  it('should render Header, Sidebar, AppBody, and PaneSplitters', () => {
    render(<Home />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('app-body')).toBeInTheDocument();
    expect(screen.getByTestId('splitter-vertical')).toBeInTheDocument();
    expect(screen.getByTestId('splitter-horizontal')).toBeInTheDocument();
  });

  it('should render sidebar items with correct labels and active state', () => {
    render(<Home />);
    const firstItem = screen.getByTestId('sidebar-item-0');
    const secondItem = screen.getByTestId('sidebar-item-1');

    expect(firstItem).toHaveTextContent('collections');
    expect(firstItem).toHaveClass('active');
    expect(secondItem).toHaveTextContent('environments');
    expect(secondItem).not.toHaveClass('active');
  });

  it('should render icons inside sidebar items', () => {
    render(<Home />);
    const firstItem = screen.getByTestId('sidebar-item-0');
    const secondItem = screen.getByTestId('sidebar-item-1');

    expect(firstItem.querySelector('svg')).toBeInTheDocument();
    expect(secondItem.querySelector('svg')).toBeInTheDocument();
  });

  it('should allow multiple clicks without errors', () => {
    render(<Home />);
    const firstItem = screen.getByTestId('sidebar-item-0');
    const secondItem = screen.getByTestId('sidebar-item-1');

    expect(() => {
      fireEvent.click(firstItem);
      fireEvent.click(secondItem);
      fireEvent.click(firstItem);
    }).not.toThrow();
  });

  it('should render main container with correct children order', () => {
    render(<Home />);
    const mainContainer = screen.getByTestId('sidebar').parentElement;
    const children = Array.from(mainContainer!.children);

    expect(children[0]).toBe(screen.getByTestId('sidebar'));
    expect(children[1]).toBe(screen.getByTestId('splitter-horizontal'));
    expect(children[2]).toBe(screen.getByTestId('app-body'));
  });

  it('should render PaneSplitter with correct directions', () => {
    render(<Home />);
    expect(screen.getByTestId('splitter-vertical')).toHaveTextContent('Splitter-vertical');
    expect(screen.getByTestId('splitter-horizontal')).toHaveTextContent('Splitter-horizontal');
  });

  it('should maintain active class only on the correct sidebar item', () => {
    render(<Home />);
    const firstItem = screen.getByTestId('sidebar-item-0');
    const secondItem = screen.getByTestId('sidebar-item-1');

    expect(firstItem).toHaveClass('active');
    expect(secondItem).not.toHaveClass('active');
  });

  it('should not throw errors when rendering multiple times', () => {
    const { rerender } = render(<Home />);
    expect(() => rerender(<Home />)).not.toThrow();
  });
});
