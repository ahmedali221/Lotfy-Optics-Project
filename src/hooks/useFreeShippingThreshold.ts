import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

// Shared across pages so the config is fetched once per page load.
let thresholdRequest: Promise<number | null> | null = null;

export function parseFreeShippingThreshold(value: string | null | undefined): number | null {
  return value == null || value === '' ? null : parseFloat(value);
}

function loadFreeShippingThreshold() {
  if (!thresholdRequest) {
    thresholdRequest = axios
      .get<{ free_shipping_threshold: string | null }>(`${API_BASE_URL}/api/orders/checkout-config/`)
      .then(({ data }) => parseFreeShippingThreshold(data.free_shipping_threshold))
      .catch((err) => {
        thresholdRequest = null;
        throw err;
      });
  }
  return thresholdRequest;
}

// Orders whose subtotal reaches the threshold ship free; null means free shipping is off.
export function qualifiesForFreeShipping(subtotal: number, threshold: number | null) {
  return threshold !== null && subtotal >= threshold;
}

export function useFreeShippingThreshold() {
  const [threshold, setThreshold] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadFreeShippingThreshold()
      .then((value) => {
        if (active) setThreshold(value);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return threshold;
}
