import { User } from 'src/user/entities/user.entity';

export class Postulation {
  id: string;
  company: string;
  position: string;
  applicationLink: string;
  applicationDate: Date;
  recruiterName: string;
  status: string;
  notes: string;
  userId: string;
  user: User; // Relación con User
  createdAt: Date;
  updatedAt: Date;
}
