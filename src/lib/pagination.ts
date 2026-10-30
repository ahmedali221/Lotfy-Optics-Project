import api from './axios';

// The API returns absolute `next` URLs. Keep only path + query so the request
// still goes through `api` (base URL, auth header, token refresh).
// The cursor token itself is opaque and is never built or edited here.
const toApiPath = (url: string) => {
  const u = new URL(url, 'http://placeholder');
  return u.pathname + u.search;
};

// Load every page of a cursor-paginated list by following `next`.
// `page_size` is capped at 100 by the API, so larger lists need several requests.
export async function fetchAllPages<T>(url: string, params: Record<string, unknown> = {}): Promise<T[]> {
  let { data } = await api.get(url, { params: { ...params, page_size: 100 } });
  if (Array.isArray(data)) return data as T[];
  const items: T[] = [...data.results];
  while (data.next) {
    ({ data } = await api.get(toApiPath(data.next)));
    items.push(...data.results);
  }
  return items;
}
