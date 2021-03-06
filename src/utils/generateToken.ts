import jwt from 'jsonwebtoken';

export default (role: string, id: number) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
