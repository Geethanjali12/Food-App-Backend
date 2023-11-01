const mongoose = require('mongoose');

const foodList = new mongoose.Schema({
    food_name: {
      type: String,
      required: true
    },
    food_price: {
      type: String,
      required: true
    }
  });

  const Food = mongoose.model('Food', foodList);

  module.exports = Food;
