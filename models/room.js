let mongoose = require('mongoose');

let roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    lines: [{
        _id: { type: String, required: true, default: new mongoose.Types.ObjectId() },
        timestamp: { type: Date, required: true, default: Date.now() },
        text: { type: String, required: true },
        user_id: {type: String, required: true},
    }],
    users: [{ type: String, ref: 'User' }]
});

mongoose.model('Room', roomSchema);