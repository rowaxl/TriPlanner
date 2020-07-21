import express from 'express';

import { USER_ROLE } from '../libs/utils';
import TripModel from '../models/trips';
import DestinationModel from '../models/destinations';

const router = express.Router();

router.get('/', async (req, res) => {
  const { type } = req.query;

  let conditions = {};
  let selectOption = { id: 1, destination: 1, description: 1, thumbnail: 1, startDate: 1, endDate: 1 };
  if (req.user.role === USER_ROLE.ADMIN) {
    Object.assign(selectOption, { user: 1 });
  } else {
    Object.assign(conditions, { user: req.user._id });
  }

  if (type === 'nextMonth') {
    const nextMonthStartDate = new Date();
    nextMonthStartDate.setMonth(nextMonthStartDate.getMonth() + 1, 1);
    nextMonthStartDate.setHours(0, 0, 0, 0);

    const nextMonthEndDate = new Date();
    nextMonthEndDate.setMonth(nextMonthEndDate.getMonth() + 2, 0);
    nextMonthEndDate.setHours(23, 59, 59);

    Object.assign(conditions, {
      startDate: {
        '$gte': nextMonthStartDate.getTime(),
        '$lte': nextMonthEndDate.getTime()
      }
    });
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    Object.assign(conditions, {
      startDate: {
        '$gte': today.getTime()
      }
    });
  }

  let trips = [];

  if (req.user.role === USER_ROLE.ADMIN) {
    trips = await TripModel.find(conditions).sort({ startDate: -1 }).select(selectOption).populate('user', 'name');
  } else {
    trips = await TripModel.find(conditions).sort({ startDate: -1 }).select(selectOption);
  }

  res.status(200).json({ trips });
});

router.get('/browse', async (req, res) => {
  let conditions = {};
  let selectOption = { id: 1, destination: 1, description: 1, thumbnail: 1, startDate: 1, endDate: 1 };
  if (req.user.role === USER_ROLE.ADMIN) {
    Object.assign(selectOption, { user: 1 });
  } else {
    Object.assign(conditions, { user: req.user._id });
  }

  let trips = [];

  if (req.user.role === USER_ROLE.ADMIN) {
    trips = await TripModel.find(conditions).sort({ startDate: -1 }).select(selectOption).populate('user', 'name');
  } else {
    trips = await TripModel.find(conditions).sort({ startDate: -1 }).select(selectOption);
  }

  res.status(200).json({ trips });
});

router.post('/', (req, res) => {
  const { id, destination, thumbnail, description, startDate, endDate } = req.body;

  TripModel.create({
    id,
    destination,
    thumbnail,
    startDate,
    endDate,
    description,
    user: req.user._id
  }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create new trip ' });
    }

    res.status(201).json({ message: 'Success to create new trip' });
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const target = await TripModel.findOne({ id });

  if (!target) {
    return res.status(403).json({ message: 'Trip not exists ' });
  }

  const { destination, thumbnail, description, startDate, endDate } = req.body;

  TripModel.findOneAndUpdate({ id }, {
    destination,
    thumbnail,
    startDate,
    endDate,
    description,
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

  const target = await TripModel.findOne({ id });

  if (!target) {
    return res.status(403).json({ message: 'Trip not exists' });
  }

  TripModel.findOneAndDelete({ id }, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to delete' });
      }

    res.status(204).json({ message: 'Delete successfully' });
  });
});

router.get('/destinations', async (req, res) => {
  const destinations = await DestinationModel.find();

  res.status(200).json(destinations);
})

export default router;