let mongoose = require('mongoose');

let lineSchema = new mongoose.Schema({
    timestamp: { type: Date, required: true, default: Date.now() },
    user: { type: String, ref: 'User' }
});

mongoose.model('Line', lineSchema);