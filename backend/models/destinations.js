import mongoose from 'mongoose';

const DestinationShcema = new mongoose.Schema({
  name: String,
  thumbnail: String
});

export default mongoose.model('Destinations', DestinationShcema);
