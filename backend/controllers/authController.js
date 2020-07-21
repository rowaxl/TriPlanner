import UserModel from '../models/users';
import { validateToken } from '../libs/utils';

export default async (req, res, next) => {
  const accessToken = req.headers['access-token'];

  if (!accessToken || validateToken(accessToken) === null) {
    return res.status(401).json({ message: 'Access-token is needed' });
  }

  const id = validateToken(accessToken);

  UserModel.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(403).json({ message: 'Cannot find user' });
    }

    Object.assign(req, { user });
    next();
  });
};