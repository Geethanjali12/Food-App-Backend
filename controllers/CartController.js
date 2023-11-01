const Cart = require('../models/CartModel');

const cartController = {
    addToCart: async (req, res) => {
        const { userId, foodItemId, quantity } = req.body;
        
        try {
            if (!userId || !foodItemId || !quantity || quantity <= 0) {
                return res.status(400).json({ 
                    status_code: 400,
                    status: false, 
                    error: 'Invalid request data' 
                });
            }
            let cart = await Cart.findOne({ userId });
            if (!cart) {
              cart = new Cart({ userId, items: [] });
              return res.status(404).json({ 
                status_code: 404,
                status: false, 
                data: items,
                error: 'No cart found' 
            });
            }
      
            const existingItemIndex = cart.items.findIndex(item => item.foodItemId === foodItemId);
      
            if (existingItemIndex !== -1) {
              cart.items[existingItemIndex].quantity += quantity;
            } else {
              cart.items.push({ foodItemId, quantity });
            }

            await cart.save();
            res.status(200).json({ 
                Status_code: 200,
                status: true, 
                data: cart,
                message: 'Item added to the cart successfully' 
            });
          } catch (error) {
            res.status(500).json({ 
                status: false, 
                status_code: 500,
                error: 'Internal server error' 
            });
          }
    },

    listCartItems: async (req, res) => {
        const { userId } = req.params;
        
        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
              return res.status(404).json({ 
                status: false, 
                status_code: 404,
                error: 'No cart found' 
            });
            }
      
            res.status(200).json({ 
                status: true, 
                status_code: 200,
                data: cart.items, 
                message: 'Cart items retrieved successfully' 
            });
          } catch (error) {
            res.status(500).json({ 
                status: false, 
                status_code: 500,
                error: 'Internal server error' 
            });
          }
    }
}

module.exports = cartController;