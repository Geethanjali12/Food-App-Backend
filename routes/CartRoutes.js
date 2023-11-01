const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.post('/add-to-cart', cartController.addToCart);
router.get('/get-cart/:userId', cartController.listCartItems);

module.exports = router;