const API_BASE = 'https://api.virtuallaunch.pro';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.text().catch(() => res.statusText);
    throw new Error(error || `HTTP ${res.status}`);
  }
  return res.json();
}

export interface Session {
  account_id: string;
  email: string;
  name?: string;
  tier?: string;
}

export interface GvlpConfig {
  tier: string;
  unlocked_games: string[];
  tokens_balance: number;
  client_id: string;
}

export interface TokenBalance {
  balance: number;
  used: number;
  total: number;
}

export interface Operator {
  account_id: string;
  name: string;
  firm_name?: string;
  email: string;
  tier: string;
  client_id: string;
  tokens_balance: number;
  unlocked_games: string[];
}

export interface Play {
  id: string;
  game_slug: string;
  visitor_id: string;
  played_at: string;
  tokens_used: number;
}

export interface PlaysResponse {
  plays: Play[];
  total: number;
}

export interface CheckoutResponse {
  session_url: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    return await apiFetch<Session>('/v1/auth/session');
  } catch {
    return null;
  }
}

export async function getGvlpConfig(client_id: string): Promise<GvlpConfig> {
  return apiFetch<GvlpConfig>(`/v1/gvlp/config?client_id=${encodeURIComponent(client_id)}`);
}

export async function getTokenBalance(client_id: string): Promise<TokenBalance> {
  return apiFetch<TokenBalance>(`/v1/gvlp/tokens/balance?client_id=${encodeURIComponent(client_id)}`);
}

export async function useToken(
  client_id: string,
  visitor_id: string,
  game_slug: string
): Promise<{ success: boolean; balance: number }> {
  return apiFetch('/v1/gvlp/tokens/use', {
    method: 'POST',
    body: JSON.stringify({ client_id, visitor_id, game_slug }),
  });
}

export async function createCheckout(
  account_id: string,
  tier: string
): Promise<CheckoutResponse> {
  return apiFetch('/v1/gvlp/stripe/checkout', {
    method: 'POST',
    body: JSON.stringify({ account_id, tier }),
  });
}

export async function getOperator(account_id: string): Promise<Operator> {
  return apiFetch<Operator>(`/v1/gvlp/operator/${encodeURIComponent(account_id)}`);
}

export async function updateOperator(
  account_id: string,
  data: Partial<Operator>
): Promise<Operator> {
  return apiFetch<Operator>(`/v1/gvlp/operator/${encodeURIComponent(account_id)}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function getPlays(
  account_id: string,
  params?: Record<string, string>
): Promise<PlaysResponse> {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<PlaysResponse>(`/v1/gvlp/operator/${encodeURIComponent(account_id)}/plays${qs}`);
}

export async function logout(): Promise<void> {
  await apiFetch('/v1/auth/logout', { method: 'POST' });
}
