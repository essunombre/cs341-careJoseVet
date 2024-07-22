const mongoose = require('mongoose');

const vetSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    hospitalId: { type: String, required: false }
});

module.exports = mongoose.model('Vet', vetSchema);
