const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const hotelRoutes = require('./routes/HotelRoutes');
const foodRoutes = require('./routes/FoodRoutes');
const cartRoutes = require('./routes/CartRoutes');
const OrderRoutes = require('./routes/OrderRoutes');
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}?authMechanism=DEFAULT&authSource=admin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', authRoutes, hotelRoutes, foodRoutes, cartRoutes, OrderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
