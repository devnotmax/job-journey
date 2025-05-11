import { Postulation } from 'src/postulation/entities/postulation.entity';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  postulations: Postulation[]; // Relación con Postulation
  createdAt: Date;
  updatedAt: Date;
}
