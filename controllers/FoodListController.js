const Food = require('../models/FoodListModel');
const Hotel = require('../models/HotelListModel');

const foodController = {

    getFoodListByHotel: async (req,res) => {
        const { hotelId } = req.params;
        try {
            const hotel = await Hotel.findById(hotelId).populate('foodList');
            if (!hotel) {
                return res.status(404).json({
                    status_code: 404,
                    status: false,
                    error: 'Hotel not found'
                });
            }
            res.status(200).json({
                status_code: 200,
                status: true,
                data: hotel.foodList,
                message: 'Food items for the hotel retrived successfully'
            });
        } catch (error) {
            res.status(500).json({
                status_code: 500,
                status: false,
                error: 'Internal server error'
            });
        }
    },

    addFoodItems: async (req,res) => {
        const { hotelId } = req.params;
        const { food_name, food_price } = req.body;
        if (!food_name || !food_price) {
            res.status(400).json({
                status_code: 400,
                status: false,
                message: 'Both Food Name and Food Price fields are required'
            });
        }

        try {
            const hotel = await Hotel.findById(hotelId);
            if (!hotel) {
                return res.status(404).json({
                    status_code: 404,
                    status: false,
                    error: 'Hotel not found'
                });
            } else {
                hotel.foodList.push({ food_name, food_price });
                await hotel.save();
                res.status(200).json({ 
                    data: hotel, 
                    status_code: 200,
                    status: true,
                    message: 'Food item added to the hotel successfully' 
                });
            }
        } catch (error) {
            res.status(500).json({
                status_code: 500,
                status: false,
                message: 'Internal Server Error'
            });
        }
    }
}

module.exports = foodController;