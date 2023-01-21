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
  // user:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'user'
  // }
});

module.exports = mongoose.model('Product', product);
