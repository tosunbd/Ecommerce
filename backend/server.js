const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend Server');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

