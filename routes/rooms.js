let express = require('express');
let router = express();

let mongoose = require('mongoose');
Room = mongoose.model('Room');
let handleError;

function getAllRooms(req, res) {
    Room.find({})
        .then(rooms => {
            res.status(200)
                .json(rooms);
        })
        .catch(err => handleError(req, res, 500, err));
}

function getRoomById(req, res) {
    Room.findById(req.params.id)
        .then(rooms => {
            res.status(200)
                .json(rooms);
        })
        .catch(err => handleError(req, res, 500, err));
}

function getRoomById(req, res) {
    Room.findById(req.params.id)
        .then(rooms => {
            res.status(200)
                .json(rooms);
        })
        .catch(err => handleError(req, res, 500, err));
}

function addRoom(req, res) {
    let newRoom = new Room(req.body);
    newRoom.save((err, savedRoom) => {
        if (err) return handleError(req, res, 500, err);

        res.status(201)
            .json({
                message: "Succesfully created and saved room with name: " + savedRoom.name,
            });
    });
}

function updateRoom(req, res) {
    Room.findOneAndUpdate(
        { _id: req.params.id },
        { name: req.body.name },
        { runValidators: true },
        (err) => {
            if (err) return handleError(req, res, 500, err);

            res.status(200)
                .json({
                    message: "Resource succesfully updated."
                });
        });
}

function deleteRoom(req, res) {
    let roomToDelete = Room.findById(req.params.id);

    if (roomToDelete.users && roomToDelete.users.length > 1) {
        return handleError(req, res, 409, "Cannot remove a room which contains users.")
    } else {
        Room.deleteOne({ _id: req.params.id }, err => {
            if (err) return handleError(req, res, 500, err);
            res.status(200)
                .json({
                    message: "Resource succesfully deleted."
                });
        });
    }
}

// Routes
router.route('/')
    .get(getAllRooms);

router.route('/:id')
    .get(getRoomById);

router.route('/')
    .post(addRoom);

router.route('/:id')
    .put(updateRoom);

router.route('/:id')
    .delete(deleteRoom);

module.exports = function (errCallback) {
    console.log('Initializing rooms routing module');
    handleError = errCallback;
    return router;
};
