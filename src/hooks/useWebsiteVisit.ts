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

    // Canonical route first; the legacy plural route covers backends deployed before it existed.
    axios
      .post<VisitResponse>(`${API_BASE_URL}/api/site/visit/`)
      .catch(err => {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          return axios.post<VisitResponse>(`${API_BASE_URL}/api/site/visits/`);
        }
        throw err;
      })
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
