import { httpClient } from './httpClient';

export const login = (user: string) => httpClient.get(`/login?user=${user}`);
