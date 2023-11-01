const Hotel = require('../models/HotelListModel');

const hotelController = {
    getAllHotels: async (req, res) => {
        try {
            const hotelList = await Hotel.find();
            if (!hotelList || hotelList.length === 0) {
                return res.status(404).json({
                    status_code: 404,
                    status: false,
                    error: 'No hotels found'
                });
            }
            res.status(200).json({
                status_code: 200,
                status: true,
                data: hotelList,
                message: 'Hotel List Retrived Successfully'
            });
        } catch (error) {
            res.status(500).json({
                status_code: 500,
                status: false,
                error: 'Internal server error'
            });
        }
    },

    postNewHotel: async (req, res) => {
        const { hotel_name, hotel_address } = req.body;
        if (!hotel_name || !hotel_address) {
            return res.status(400).json({
                status_code: 400,
                status: false,
                message: 'Both Hotel Name and Hotel Address is required.'
            });
        }
        try {
            const hotelList = new Hotel({ hotel_name, hotel_address });
            await hotelList.save();
            res.status(200).json({ 
                data: hotelList, 
                status_code: 200,
                status: true,
                message: 'Hotel Added successfully' 
            });
        } catch (error) {
            res.status(500).json({ 
                status_code: 500,
                status: false,
                error: 'Internal server error' 
            });
        }
    }
};

module.exports = hotelController;