import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get, post, patch, put, delete_req } from '../../src/api/rest';
import { Header } from '../../src/components/RequestPanel/types';

// Mock window.api
const mockFetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  global.window = {
    ...global.window,
    api: {
      fetch: mockFetch,
    },
  } as any;
});

describe('REST API Functions', () => {
  const mockUrl = 'https://api.example.com/data';
  const mockHeaders: Header[] = [
    { key: 'Content-Type', value: 'application/json' },
    { key: 'Authorization', value: 'Bearer token123' },
  ];

  describe('get', () => {
    it('should call window.api.fetch with GET method', async () => {
      const mockResponse = {
        ok: true,
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
      };
      mockFetch.mockResolvedValue(mockResponse);

      const result = await get(mockUrl, mockHeaders);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        method: 'GET',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should work with empty headers', async () => {
      const mockResponse = { ok: true, data: {} };
      mockFetch.mockResolvedValue(mockResponse);

      await get(mockUrl);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {},
        method: 'GET',
      });
    });
  });

  describe('post', () => {
    it('should call window.api.fetch with POST method and body', async () => {
      const body = { name: 'test', value: 123 };
      const mockResponse = { ok: true, data: { id: 1 } };
      mockFetch.mockResolvedValue(mockResponse);

      await post(mockUrl, body, mockHeaders);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
    });

    it('should handle array body', async () => {
      const body = [1, 2, 3];
      mockFetch.mockResolvedValue({ ok: true });

      await post(mockUrl, body);

      expect(mockFetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          body: JSON.stringify(body),
        })
      );
    });
  });

  describe('patch', () => {
    it('should call window.api.fetch with PATCH method', async () => {
      const body = { status: 'updated' };
      mockFetch.mockResolvedValue({ ok: true });

      await patch(mockUrl, body, mockHeaders);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        method: 'PATCH',
        body: JSON.stringify(body),
      });
    });
  });

  describe('put', () => {
    it('should call window.api.fetch with PUT method', async () => {
      const body = { name: 'updated', value: 456 };
      mockFetch.mockResolvedValue({ ok: true });

      await put(mockUrl, body, mockHeaders);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        method: 'PUT',
        body: JSON.stringify(body),
      });
    });
  });

  describe('delete_req', () => {
    it('should call window.api.fetch with DELETE method', async () => {
      mockFetch.mockResolvedValue({ ok: true, status: 204 });

      await delete_req(mockUrl, mockHeaders);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer token123',
        },
        method: 'DELETE',
      });
    });

    it('should work without headers', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      await delete_req(mockUrl);

      expect(mockFetch).toHaveBeenCalledWith(mockUrl, {
        headers: {},
        method: 'DELETE',
      });
    });
  });
});
