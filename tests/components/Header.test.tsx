import { render, screen } from '@testing-library/react';
import { describe, it, expect} from 'vitest';
import Header from '../../src/components/Header';

describe('Header', () => {
  it('should have the correct class name for the header container', () => {
    render(<Header/> );

    const headerElement = screen.getByText('REQ.IO').parentElement;
    expect(headerElement).toHaveClass('header');
  });

  it('should render the Header component with title', () => {
    render(<Header/> );

    const titleElement = screen.getByText('REQ.IO');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('title');
  });
});
