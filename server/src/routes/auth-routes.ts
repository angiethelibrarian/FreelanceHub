import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/user.js';
import { getNewToken } from '../helpers/index.js';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = getNewToken(username);
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
