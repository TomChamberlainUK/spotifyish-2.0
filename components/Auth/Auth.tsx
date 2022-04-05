import type { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

type Props = {
  children: ReactNode
}

export default function Auth({ children }: Props) {
  const { data: session } = useSession({ required: true });
  const isUser = session?.user;
  if (isUser) {
    return <>{children}</>;
  }
  return <div>Loading...</div>;
}