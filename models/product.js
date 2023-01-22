const mongoose = require('mongoose');

const product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
    default: 'https://unsplash.com/photos/H2CSTaboiy0',
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

module.exports = mongoose.model('Product', product);
