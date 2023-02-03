const mongoose = require('mongoose');

const order = new mongoose.Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, equired: true },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
});

module.exports = mongoose.model('Order', order);
