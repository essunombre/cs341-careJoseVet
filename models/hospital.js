const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name: { type: String, required: false },
    address: { type: String, required: false },
    phoneNumber: { type: String, required: false },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
