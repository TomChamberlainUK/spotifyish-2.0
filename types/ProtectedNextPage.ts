import type { NextPage } from 'next';

export type ProtectedNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  auth: boolean;
}