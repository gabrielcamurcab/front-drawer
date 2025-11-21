import axios from 'axios';

// Use /api to leverage the Next.js proxy configured in next.config.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
});

export interface Session {
  session_id: string;
}

export interface Names {
  names: string[];
}

export interface DrawResult {
  result: string;
}

export const createSession = async (): Promise<string> => {
  const response = await api.post<Session>('/sessions');
  return response.data.session_id;
};

export const dropSession = async (sessionId: string): Promise<void> => {
  await api.delete(`/sessions/${sessionId}`);
};

export const addName = async (sessionId: string, name: string): Promise<void> => {
  await api.post(`/sessions/${sessionId}/names`, { name });
};

export const getNames = async (sessionId: string): Promise<string[]> => {
  const response = await api.get<Names>(`/sessions/${sessionId}/names`);
  return Array.isArray(response.data.names) ? response.data.names : [];
};

export const drawName = async (sessionId: string): Promise<string> => {
  const response = await api.post<DrawResult>(`/sessions/${sessionId}/draw`);
  return response.data.result;
};
