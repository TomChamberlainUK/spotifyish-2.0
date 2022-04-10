import type { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  href: string,
  className?: string
}

export default function ExternalLink({
  children,
  href,
  className
}: Props) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}