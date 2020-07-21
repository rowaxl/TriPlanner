import mongoose, { Schema } from 'mongoose';

const TripSchema = new mongoose.Schema({
  id: String,
  destination: String,
  startDate: Number,
  endDate: Number,
  description: String,
  thumbnail: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

export default mongoose.model('Trip', TripSchema);