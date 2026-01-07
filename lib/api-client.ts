'use client';

import type {
  CreatePaymentIntentRequest,
  OrderResponse,
  PaymentIntentResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('authToken')
      : null;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ?? 'An error occurred',
      data
    );
  }

  return data as T;
}

export const apiClient = {
  getOrder(orderId: string) {
    return fetchApi<OrderResponse>(`/api/v1/orders/${orderId}`);
  },

  createPaymentIntent(data: CreatePaymentIntentRequest) {
    return fetchApi<PaymentIntentResponse>(
      '/api/v1/payments/process',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },
};
