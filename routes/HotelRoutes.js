const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/HotelListController');

router.get('/get-hotel-list', hotelController.getAllHotels);
router.post('/create-hotel', hotelController.postNewHotel);

module.exports = router;