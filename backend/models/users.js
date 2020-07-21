import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
  role: Number,
});

export default mongoose.model('User', UserSchema);