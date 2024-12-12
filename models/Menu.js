import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
});

export default mongoose.model('Menu', menuSchema);
