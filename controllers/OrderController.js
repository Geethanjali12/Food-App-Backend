const Order = require('../models/OrderModel');

const orderController = {
    placeOrder: async (req, res) => {
        const { userId, items, totalPrice } = req.body;

        try {
            if (!userId || !items || !totalPrice || totalPrice <= 0) {
                return res.status(400).json({ 
                    status_code: 400, 
                    status: false, 
                    error: 'Invalid order data' 
                });
            }

            const order = new Order({ userId, items, totalPrice });
            await order.save();

            res.status(200).json({ 
                status_code: 200, 
                status: true, 
                data: order, 
                message: 'Order placed successfully' 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                status_code: 500, 
                status: false, 
                error: 'Internal server error' 
            });
        }
    }
};

module.exports = orderController;
