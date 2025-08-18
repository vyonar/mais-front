// src/services/mais/auth.ts
import { request } from '@umijs/max';

export type LoginReq = { email: string; password: string };

export type LoginRes = {
  token: string;
  tokenType?: string | null;
  name: string;
  surname: string;
  email: string;
  role: string;
};

export async function login(body: LoginReq) {
  return request<LoginRes>('/api/auth/login', {
    method: 'POST',
    data: body,
  });
}

// Backend'te mevcut bir "me" uç noktası varsayıyoruz.
// Response, layout'un beklediği currentUser alanlarını dönecek şekilde olmalı.
export type CurrentUser = {
  name?: string;
  avatar?: string;
  email?: string;
  role?: string;
};

export async function getCurrentUser() {
  return request<CurrentUser>('/api/auth/me', {
    method: 'GET',
  });
}
