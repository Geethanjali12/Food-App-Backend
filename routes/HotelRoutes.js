const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/HotelListController');

router.get('/get-hotel-list', hotelController.getAllHotels);

module.exports = router;