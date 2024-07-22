const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    animal: { type: String, required: false },
    age: { type: String, required: false },
    reason: { type: String, required: false },
    sex: { type: String, required: false },
    name: { type: String, required: false },
    status: { type: String, required: false },
    ownerId: { type: String, required: false },
    vetId: { type: String, required: false },
});

module.exports = mongoose.model('Pet', petSchema);
