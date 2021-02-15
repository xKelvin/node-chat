let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    profile_image: { type: String, required: true, default: "avatar.png" }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('profile_image_verbose').get(function () {
    return "/public/" + this.profile_image;
});

mongoose.model('User', userSchema);