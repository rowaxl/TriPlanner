import express from 'express';

import {
  dehash,
  hashWithoutTimestamp,
  validateTimestamp,
  generateUserToken,
  USER_ROLE,
} from '../libs/utils';

import auth from './authController';
import UserModel from '../models/users';
import TripModel from '../models/trips';

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  const { id, hashedPassword } = req.body;

  if (!id || !hashedPassword) {
    return res.status(403).json({ message: 'Invalid parameters' });
  }

  const { dehahsedPassword, timestamp } = dehash(hashedPassword);

  if (!dehahsedPassword || !timestamp || !validateTimestamp(timestamp)) {
    return res.status(403).json({ message: 'Invalid password. Try again' });
  }
  try {
    const user = await UserModel.findOne({ id, password: hashWithoutTimestamp(dehahsedPassword) }).catch(e => {
      console.log('DB error: ', e);
    });
  
    if (!user || user.length < 1) {
      res.status(403).json({ message: 'User not exsists' });
      return;
    }

    console.log('>>>>> ', user._id);
  
    const accessToken = generateUserToken({ _id: user._id });
  
    res.status(200).json({ accessToken, userId: user._id  });
  } catch (error) {
    console.log('>>>>>')
    console.error(error);
  }
});

router.post('/signup', async (req, res, next) => {
  const { id, name, hashedPassword, role } = req.body;

  if (!id || !name || !hashedPassword || !role) {
    return res.status(403).json({ message: 'Invalid parameters' });
  }

  const { dehahsedPassword, timestamp } = dehash(hashedPassword);

  if (!dehahsedPassword || !timestamp || !validateTimestamp(timestamp)) {
    return res.status(403).json({ message: 'Invalid password. Try again' });
  }

  const duplicateUser = await UserModel.findOne({ id }).catch(e => {
    console.log('DB error: ', e);
  });

  if (duplicateUser) {
    return res.status(403).json({ message: 'User already exsists' });
  }

  UserModel.create({
    id,
    name,
    password: hashWithoutTimestamp(dehahsedPassword),
    role
  }).then(r => {
    res.status(201).json({ message: 'Success sign up' });
  }).catch(e => {
    console.log('DB error: ', e);
  });
});

router.get('/:user_id', auth, async (req, res) => {
  const userId = req.params['user_id'];

  console.log('86>>>>> ', userId);

  if (!userId) {
    res.status(403).json({ message: 'User Id is needed' });
    return;
  }

  const detail = await UserModel.findOne({ _id: userId }).select({ id: 1, name: 1, role: 1 });

  if (!detail) {
    res.status(500).json({ message: 'Failed to find user ' });
  }

  res.status(200).json({ detail });
});

router.get('/', auth, async (req, res) => {
  if (req.user.role === USER_ROLE.USER) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  const users = await UserModel.find().select({ _id: 1, id: 1, name: 1, role: 1 });

  res.status(200).json(users);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const target = await UserModel.findOne({ id });

  if (!target) {
    return res.status(403).json({ message: 'Trip not exists ' });
  }

  const { name, hashedPassword, role } = req.body;
  const { dehahsedPassword } = dehash(hashedPassword);

  UserModel.findOneAndUpdate({ id }, {
    name,
    password: hashWithoutTimestamp(dehahsedPassword),
    role
  }, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update' });
      }

    res.status(200).json({ message: 'Update successfully' });
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const target = await UserModel.findOne({ id });

  if (!target) {
    return res.status(403).json({ message: 'Trip not exists' });
  }

  UserModel.findOneAndDelete({ id }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete' });
    }

    TripModel.deleteMany({ user: target._id }, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete user\'s trip' });
      }

      res.status(204).json({ message: 'Delete successfully' });
    });
  });
});


export default router;