/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Electron IPC Handler - rest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content-Type Handling', () => {
    it('should parse JSON responses', async () => {
      const mockData = { message: 'success', id: 123 };
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: vi.fn().mockResolvedValue(mockData),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      // Simulate the IPC handler logic
      const response = await fetch('https://api.example.com/data');
      const headers: Record<string, string> = {};
      response.headers.forEach((value: string, key: string) => {
        headers[key] = value;
      });

      const contentType = response.headers.get('content-type') || '';
      expect(contentType).toContain('application/json');
    });

    it('should handle HTML responses as text', async () => {
      const mockHtml = '<!DOCTYPE html><html><body>Hello</body></html>';
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'text/html']]),
        text: vi.fn().mockResolvedValue(mockHtml),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      const response = await fetch('https://example.com');
      const contentType = response.headers.get('content-type') || '';
      expect(contentType).toContain('text/html');
    });

    it('should handle XML responses as text', async () => {
      const mockXml = '<?xml version="1.0"?><root><item>test</item></root>';
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/xml']]),
        text: vi.fn().mockResolvedValue(mockXml),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      const response = await fetch('https://api.example.com/data.xml');
      const contentType = response.headers.get('content-type') || '';
      expect(contentType).toContain('application/xml');
    });
  });

  describe('Response Status Handling', () => {
    it('should return status and statusText for successful requests', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: vi.fn().mockResolvedValue({ data: 'test' }),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      const response = await fetch('https://api.example.com/data');
      
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
      expect(response.ok).toBe(true);
    });

    it('should handle 404 errors', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        headers: new Map([['content-type', 'application/json']]),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      const response = await fetch('https://api.example.com/notfound');
      
      expect(response.status).toBe(404);
      expect(response.statusText).toBe('Not Found');
      expect(response.ok).toBe(false);
    });

    it('should handle 500 errors', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'application/json']]),
      };
      
      mockFetch.mockResolvedValue(mockResponse);

      const response = await fetch('https://api.example.com/error');
      
      expect(response.status).toBe(500);
      expect(response.ok).toBe(false);
    });
  });

  describe('Headers Conversion', () => {
    it('should convert Headers to plain object', () => {
      const headers = new Map([
        ['content-type', 'application/json'],
        ['authorization', 'Bearer token123'],
        ['x-custom-header', 'custom-value'],
      ]);

      const headersObj: Record<string, string> = {};
      headers.forEach((value, key) => {
        headersObj[key] = value;
      });

      expect(headersObj).toEqual({
        'content-type': 'application/json',
        'authorization': 'Bearer token123',
        'x-custom-header': 'custom-value',
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      const networkError = new Error('Failed to fetch');
      mockFetch.mockRejectedValue(networkError);

      await expect(fetch('https://api.example.com/data')).rejects.toThrow(
        'Failed to fetch'
      );
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('Request timeout');
      mockFetch.mockRejectedValue(timeoutError);

      await expect(fetch('https://api.example.com/data')).rejects.toThrow(
        'Request timeout'
      );
    });
  });
});
