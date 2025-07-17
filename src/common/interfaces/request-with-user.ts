import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    idUsuario: number;
    nombre: string;
  };
}
