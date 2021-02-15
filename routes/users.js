let express = require('express');
let router = express();

let mongoose = require('mongoose');
User = mongoose.model('User');
let handleError;

function getAllUsers(req, res) {
    User.find({})
        .then(users => {
            res.status(200)
                .json(users);
        })
        .catch(err => handleError(req, res, 500, err));
}

function getUserById(req, res) {
    User.findById(req.params.id)
        .then(users => {
            res.status(200)
                .json(users);
        })
        .catch(err => handleError(req, res, 500, err));
}

function getUserById(req, res) {
    User.findById(req.params.id)
        .then(users => {
            res.status(200)
                .json(users);
        })
        .catch(err => handleError(req, res, 500, err));
}

function addUser(req, res) {
    let newUser = new User(req.body);
    newUser.save((err, savedUser) => {
        if (err) return handleError(req, res, 500, err);

        res.status(201)
            .json({
                message: "Succesfully created and saved user with username: " + savedUser.username,
            });
    });
}

function updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.id },
        { username: req.body.username },
        { runValidators: true },
        (err) => {
            if (err) return handleError(req, res, 500, err);

            res.status(200)
                .json({
                    message: "Resource succesfully updated."
                });
        });
}

function deleteUser(req, res) {
    // TODO: Also delete lines belonging to the user    
    User.deleteOne({ _id: req.params.id }, err => {
        if (err) return handleError(req, res, 500, err);
        res.status(200)
            .json({
                message: "Resource succesfully deleted."
            });
    });
}

// Routes
router.route('/')
    .get(getAllUsers);

router.route('/:id')
    .get(getUserById);

router.route('/')
    .post(addUser);

router.route('/:id')
    .put(updateUser);

router.route('/:id')
    .delete(deleteUser);

module.exports = function (errCallback) {
    console.log('Initializing users routing module');
    handleError = errCallback;
    return router;
};