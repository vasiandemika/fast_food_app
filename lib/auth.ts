// lib/auth.ts
import { api } from './api';
import { tokenStore } from './token';

export type AuthPayload = { username: string; password: string };
export type AuthResponse = { id: number; username: string; accessToken: string };

export async function signUp(payload: AuthPayload) {
    const { data } = await api.post<AuthResponse>('/auth/sign-up', payload)
    if (!data?.accessToken) throw new Error('No access token in response')
    await tokenStore.set(data.accessToken)
    return { id: data.id, username: data.username }
}

export async function signIn(payload: AuthPayload) {
    const { data } = await api.post<AuthResponse>('/auth/sign-in', payload)
    await tokenStore.set(data.accessToken)
    return { id: data.id, username: data.username }
}