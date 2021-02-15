let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    lines: [{type: String, ref: 'line'}]
});

mongoose.model('User', userSchema);