const express = require('express');
const router = express.Router();

const foodController = require('../controllers/FoodListController');

router.get('/get-food-list/:hotelId', foodController.getFoodListByHotel);
router.post('/add-food-list/:hotelId', foodController.addFoodItems);

module.exports = router;