let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    lines: [{ type: String, ref: 'Line' }]
});

mongoose.model('Room', roomSchema);