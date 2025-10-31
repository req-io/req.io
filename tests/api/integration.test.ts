import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get, post } from '../../src/api/rest';

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Full Request Flow', () => {
    it('should handle a complete GET request with headers and response', async () => {
      const mockResponse = {
        ok: true,
        data: { users: [{ id: 1, name: 'John' }] },
        status: 200,
        statusText: 'OK',
        headers: {
          'content-type': 'application/json',
          'x-ratelimit-remaining': '99',
        },
      };

      global.window = {
        ...global.window,
        api: {
          fetch: vi.fn().mockResolvedValue(mockResponse),
        },
      } as any;

      const result = await get('https://api.example.com/users', [
        { key: 'Authorization', value: 'Bearer token' },
      ]);

      expect(result.ok).toBe(true);
      expect(result.status).toBe(200);
      expect(result.data).toEqual({ users: [{ id: 1, name: 'John' }] });
      expect(result.headers).toBeDefined();
      expect(result.headers?.['content-type']).toBe('application/json');
    });

    it('should handle a complete POST request with body', async () => {
      const mockResponse = {
        ok: true,
        data: { id: 123, created: true },
        status: 201,
        statusText: 'Created',
        headers: {
          'content-type': 'application/json',
          location: '/api/users/123',
        },
      };

      global.window = {
        ...global.window,
        api: {
          fetch: vi.fn().mockResolvedValue(mockResponse),
        },
      } as any;

      const body = { name: 'Jane Doe', email: 'jane@example.com' };
      const result = await post('https://api.example.com/users', body, [
        { key: 'Content-Type', value: 'application/json' },
      ]);

      expect(result.ok).toBe(true);
      expect(result.status).toBe(201);
      expect(result.data).toEqual({ id: 123, created: true });
      expect(result.headers?.location).toBe('/api/users/123');
    });

    it('should handle error responses', async () => {
      const mockErrorResponse = {
        ok: false,
        error: 'HTTP 404: Not Found',
        status: 404,
        statusText: 'Not Found',
        headers: {
          'content-type': 'application/json',
        },
      };

      global.window = {
        ...global.window,
        api: {
          fetch: vi.fn().mockResolvedValue(mockErrorResponse),
        },
      } as any;

      const result = await get('https://api.example.com/notfound');

      expect(result.ok).toBe(false);
      expect(result.status).toBe(404);
      expect(result.error).toBe('HTTP 404: Not Found');
    });
  });
});
