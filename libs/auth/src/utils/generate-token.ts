import { randomBytes } from 'crypto';
import base64url from 'base64url';

export function generateResetToken(): string {
  return base64url(randomBytes(32));
}
