'use client';

import { Error as ErrorBoundary } from '@/components';

interface ErrorProps {
  error: Error & { digest?: string };
}

const Error = ({ error }: ErrorProps) => (
  <ErrorBoundary message={error.message} />
);

export default Error;
