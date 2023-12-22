import { User } from '@prisma/client';

export interface AuthRequest extends Express.Request {
  user?: User; // Adjust the type according to your user model
}
