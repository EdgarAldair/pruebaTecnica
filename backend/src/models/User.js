const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idNumber: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: true }
});

module.exports = mongoose.model('User', userSchema);
