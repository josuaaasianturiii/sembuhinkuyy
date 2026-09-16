// Base API URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic API request handler with timeout and error handling
 * @param {string} endpoint - API path (e.g. '/symptoms')
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<any>} Response JSON data
 */
async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Koneksi server mengalami timeout. Harap coba lagi.');
    }
    throw error;
  }
}

/**
 * Fetch body zones and symptoms list from backend API
 */
export async function fetchSymptoms() {
  try {
    const res = await apiRequest('/symptoms', { method: 'GET' });
    return res.data;
  } catch (error) {
    console.warn('[API Warning] Could not reach backend server /api/symptoms:', error.message);
    throw error;
  }
}

/**
 * Submit selected symptoms to backend for diagnostic analysis
 * @param {Array<{id: string, label: string, zone: string, duration: string, severity: string, notes: string}>} symptoms 
 */
export async function submitDiagnosis(symptoms) {
  try {
    const payload = {
      symptoms: symptoms.map((s) => ({
        id: s.id,
        label: s.label,
        zone: s.zone,
        duration: s.duration || 'Hari ini saja',
        severity: s.severity || 'ringan',
        notes: s.notes || '',
      })),
    };

    const res = await apiRequest('/diagnosa', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return res.data;
  } catch (error) {
    console.warn('[API Warning] Could not submit diagnosis to backend:', error.message);
    throw error;
  }
}

/**
 * Check backend API health status
 */
export async function checkBackendHealth() {
  try {
    const res = await apiRequest('/health', { method: 'GET' });
    return res.status === 'OK';
  } catch (error) {
    return false;
  }
}
