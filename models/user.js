let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
});

mongoose.model('User', userSchema);