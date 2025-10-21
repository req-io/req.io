import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Editor from '../../src/components/Editor';
import '@testing-library/jest-dom';

vi.spyOn(console, 'log').mockImplementation(() => {});

vi.mock('react-ace', () => ({
  default: ({
    className,
    value,
    readOnly,
    onChange,
    onLoad,
  }: {
    className?: string;
    value?: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
    onLoad?: () => void;
  }) => {
    if (onLoad) {
      onLoad();
    }

    return (
      <div
        data-testid="ace-editor"
        className={className}
        data-readonly={readOnly?.toString()}
        data-value={value}
      >
        <textarea
          data-testid="ace-editor-textarea"
          value={value}
          readOnly={readOnly}
          onChange={(e) => {
            if (onChange && !readOnly) {
              onChange(e.target.value);
            }
          }}
        />
      </div>
    );
  },
}));

vi.mock('ace-builds/src-noconflict/mode-json', () => ({}));
vi.mock('ace-builds/src-noconflict/theme-terminal', () => ({}));
vi.mock('ace-builds/src-noconflict/ext-language_tools', () => ({}));
vi.mock('ace-builds/src-noconflict/worker-json?url', () => ({
  default: 'mocked-worker-url',
}));
vi.mock('ace-builds/src-noconflict/ace', () => ({
  default: {
    config: {
      setModuleUrl: vi.fn(),
    },
  },
}));

describe('Editor Component', () => {
  const mockOnValueChange = vi.fn();
  const mockJsonValue = '{"name": "test", "value": 123}';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('JsonViewer (Read-only mode)', () => {
    it('should render JsonViewer when readOnly is true', () => {
      render(<Editor readOnly={true} initialValue={mockJsonValue} />);

      const editor = screen.getByTestId('ace-editor');
      expect(editor).toBeInTheDocument();
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });

    it('should display the initial value in read-only mode', () => {
      render(<Editor readOnly={true} initialValue={mockJsonValue} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(mockJsonValue);
    });

    it('should not allow editing in read-only mode', () => {
      render(<Editor readOnly={true} initialValue={mockJsonValue} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveAttribute('readOnly');
    });

    it('should render with empty initial value in read-only mode', () => {
      render(<Editor readOnly={true} initialValue="" />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue('');
    });

    it('should render with complex JSON in read-only mode', () => {
      const complexJson = JSON.stringify({
        users: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
        ],
        metadata: { count: 2 },
      });

      render(<Editor readOnly={true} initialValue={complexJson} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(complexJson);
    });

    it('should render JsonViewer when readOnly is true and log correct message', () => {
      vi.clearAllMocks();
      render(<Editor readOnly={true} initialValue={mockJsonValue} />);

      expect(console.log).toHaveBeenCalledWith('Read only Editor loaded!');
    });
  });

  describe('JsonEditor (Editable mode)', () => {
    it('should render JsonEditor when readOnly is false and log correct message', () => {
      vi.clearAllMocks();
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      expect(console.log).toHaveBeenCalledWith('Editor loaded!');
    });

    it('should display the initial value in editable mode', () => {
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(mockJsonValue);
    });

    it('should allow editing in editable mode', () => {
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).not.toHaveAttribute('readOnly');
    });

    it('should call onValueChange when content is modified', () => {
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      const newValue = '{"name": "updated", "value": 456}';

      fireEvent.change(textarea, { target: { value: newValue } });

      expect(mockOnValueChange).toHaveBeenCalledWith(newValue);
      expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    });

    it('should update internal state when content changes', () => {
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      const newValue = '{"updated": true}';

      fireEvent.change(textarea, { target: { value: newValue } });

      expect(textarea).toHaveValue(newValue);
    });

    it('should handle multiple consecutive changes', () => {
      render(<Editor readOnly={false} initialValue="" onValueChange={mockOnValueChange} />);

      const textarea = screen.getByTestId('ace-editor-textarea');

      fireEvent.change(textarea, { target: { value: '{' } });
      fireEvent.change(textarea, { target: { value: '{"name"' } });
      fireEvent.change(textarea, { target: { value: '{"name": "test"}' } });

      expect(mockOnValueChange).toHaveBeenCalledTimes(3);
      expect(mockOnValueChange).toHaveBeenLastCalledWith('{"name": "test"}');
    });

    it('should work without onValueChange callback', () => {
      render(<Editor readOnly={false} initialValue={mockJsonValue} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      const newValue = '{"test": "no callback"}';

      expect(() => {
        fireEvent.change(textarea, { target: { value: newValue } });
      }).not.toThrow();

      expect(textarea).toHaveValue(newValue);
    });

    it('should render with empty initial value in editable mode', () => {
      render(<Editor readOnly={false} initialValue="" onValueChange={mockOnValueChange} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue('');
    });

    it('should handle clearing content', () => {
      render(
        <Editor readOnly={false} initialValue={mockJsonValue} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');

      fireEvent.change(textarea, { target: { value: '' } });

      expect(mockOnValueChange).toHaveBeenCalledWith('');
      expect(textarea).toHaveValue('');
    });

    it('should handle invalid JSON input', () => {
      render(<Editor readOnly={false} initialValue="" onValueChange={mockOnValueChange} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      const invalidJson = '{invalid json}';

      fireEvent.change(textarea, { target: { value: invalidJson } });

      expect(mockOnValueChange).toHaveBeenCalledWith(invalidJson);
      expect(textarea).toHaveValue(invalidJson);
    });
  });

  describe('Editor styling and className', () => {
    it('should apply the correct className to the editor', () => {
      render(<Editor readOnly={false} initialValue="" />);

      const editor = screen.getByTestId('ace-editor');
      expect(editor).toHaveClass('editor');
    });

    it('should apply the correct className in read-only mode', () => {
      render(<Editor readOnly={true} initialValue="" />);

      const editor = screen.getByTestId('ace-editor');
      expect(editor).toHaveClass('editor');
    });
  });

  describe('Edge cases', () => {
    it('should handle very long JSON strings', () => {
      const longJson = JSON.stringify({
        data: Array(1000)
          .fill(null)
          .map((_, i) => ({ id: i, value: `item-${i}` })),
      });

      render(<Editor readOnly={false} initialValue={longJson} onValueChange={mockOnValueChange} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(longJson);
    });

    it('should handle special characters in JSON', () => {
      const specialCharsJson =
        '{"text": "Line 1\\nLine 2\\tTabbed", "emoji": "🚀", "unicode": "\\u0041"}';

      render(
        <Editor
          readOnly={false}
          initialValue={specialCharsJson}
          onValueChange={mockOnValueChange}
        />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(specialCharsJson);
    });

    it('should handle nested JSON objects', () => {
      const nestedJson = JSON.stringify({
        level1: {
          level2: {
            level3: {
              level4: {
                value: 'deeply nested',
              },
            },
          },
        },
      });

      render(<Editor readOnly={true} initialValue={nestedJson} />);

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(nestedJson);
    });

    it('should handle JSON arrays', () => {
      const arrayJson = JSON.stringify([1, 2, 3, 'four', { five: 5 }, [6, 7]]);

      render(
        <Editor readOnly={false} initialValue={arrayJson} onValueChange={mockOnValueChange} />
      );

      const textarea = screen.getByTestId('ace-editor-textarea');
      expect(textarea).toHaveValue(arrayJson);
    });
  });
});
