import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

// Read helpers for filter values stored in the query string.
export const readList = (params: URLSearchParams, key: string) =>
  (params.get(key) ?? '').split(',').filter(Boolean);

export const readNumberList = (params: URLSearchParams, key: string) =>
  readList(params, key).map(Number).filter(n => !Number.isNaN(n));

// Mirror filter state into the query string so Back from a product page
// restores the same filters. Uses replace, so filter changes never add history
// entries. Empty values remove their key; other keys (e.g. `tab`) are kept.
export function useSyncSearchParams(values: Record<string, string>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const serialized = JSON.stringify(values);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true, preventScrollReset: true });
    }
  }, [serialized]); // eslint-disable-line react-hooks/exhaustive-deps
}
