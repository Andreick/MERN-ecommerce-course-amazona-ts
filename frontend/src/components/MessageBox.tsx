import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';

type MessageBoxProps = { children: ReactNode; variant?: Variant };

export default function MessageBox({
  variant = 'info',
  children,
}: MessageBoxProps) {
  return <Alert variant={variant}>{children}</Alert>;
}
