const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
        //,select: false // Ensures password is not returned in every query
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: "admin"
    }
});

module.exports = model('admins', adminSchema);
