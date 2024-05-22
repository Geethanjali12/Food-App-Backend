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

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', authRoutes, hotelRoutes, foodRoutes, cartRoutes, OrderRoutes);

const PORT = process.env.DB_PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
