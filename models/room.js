let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    lines: [{
        timestamp: { type: Date, required: true, default: Date.now() },
        text: { type: String, required: true }
    }],
    users: [{ type: String, red: 'User' }]
});

mongoose.model('Room', roomSchema);