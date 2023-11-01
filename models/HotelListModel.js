const mongoose = require('mongoose');

const hotelList = new mongoose.Schema({
    hotel_name: {
      type: String,
      required: true
    },
    hotel_address: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    foodList: [
      {
        food_name: {
          type: String,
          required: true
        },
        food_price: {
          type: Number,
          required: true
        },
        created_at: {
          type: Date,
          default: Date.now
        }
      }
    ]
  });

  const Hotel = mongoose.model('Hotel', hotelList);

  module.exports = Hotel;
