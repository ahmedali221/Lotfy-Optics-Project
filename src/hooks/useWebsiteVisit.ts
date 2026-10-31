import axios from 'axios';
import { useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
const ACTIVE_VISIT_KEY = 'lotfy_active_visit';

let visitRequestInProgress = false;

interface VisitResponse {
  active_visit: boolean;
}

export function useWebsiteVisit() {
  useEffect(() => {
    if (sessionStorage.getItem(ACTIVE_VISIT_KEY) || visitRequestInProgress) {
      return;
    }

    visitRequestInProgress = true;

    // Legacy plural route: supported by both current and Phase 1 backends.
    axios
      .post<VisitResponse>(`${API_BASE_URL}/api/site/visits/`)
      .then(({ data }) => {
        if (data.active_visit === true) {
          sessionStorage.setItem(ACTIVE_VISIT_KEY, 'true');
        }
      })
      .catch(() => {
        // Visit analytics must never interrupt the shopping experience.
      })
      .finally(() => {
        visitRequestInProgress = false;
      });
  }, []);
}
