const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['scarf', 'beanie', 'accessory'], required: true },
  imageUrl: { type: String, required: true },
  size: { type: String }, // Optional field for size
  color: { type: String }, // Optional field for color
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
