import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model('MenuItem', menuItemSchema);
