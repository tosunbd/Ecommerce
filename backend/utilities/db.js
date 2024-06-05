const mongoose = require('mongoose');

module.exports.dbConnect = () => {
    try
    {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    }
    catch (error) {
        console.log(error);
    }
}