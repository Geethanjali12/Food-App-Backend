const mongoose = require('mongoose');

const hotelList = new mongoose.Schema({
    hotel_name: {
      type: String,
      required: true
    },
    hotel_address: {
      type: String,
      required: true
    }
  });

  const Hotel = mongoose.model('Hotel', hotelList);

  module.exports = Hotel;
