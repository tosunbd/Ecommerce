const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/dashboard/categoryRoutes');
const productRoutes = require('./routes/dashboard/productRoutes');
const sellerRoutes = require('./routes/dashboard/sellerRoutes');
const { dbConnect } = require('./utilities/db');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
dbConnect();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json()); // This line is effectively doing what express.json() does
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', sellerRoutes);
app.get('/', (req, res) => {
    res.send('Backend Server is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server startup
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
