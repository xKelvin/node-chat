const { json } = require('body-parser');
let express = require('express');
let router = express();

let mongoose = require('mongoose');
Room = mongoose.model('Room');
User = mongoose.model('User');
let handleError;

function getAllRooms(req, res) {
    var query = Room.find({});

        if(req.query.orderBy){
            query.sort('field ' + req.query.orderBy)
        }

        query.then(rooms => {
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

function getRoomLines(req, res) {
    Room.findById(req.params.id)
        .then(room => {
            res.status(200)
                .json(room.lines);
        })
        .catch(err => handleError(req, res, 500, err));
}

function addRoomLine(req, res) {
    Room.findById(req.params.id)
        .then(room => {

            let line = {
                text: req.body.text,
                user_id: req.body.user_id,
            };

            room.users.push(req.body.user_id);
            room.lines.push(line);
            room.save(
                (err) => {
                    if (err) return handleError(req, res, 500, err);

                    res.status(200)
                        .json({
                            message: "Line succesfully send to room."
                        });
                });
        })
        .catch(err => handleError(req, res, 500, err));
}

function getRoomUsers(req, res) {
    Room.findById(req.params.id)
        .populate('users')
        .then(room => {
            res.status(200)
                .json(room.users);
        })
        .catch(err => handleError(req, res, 500, err));
}

function getRoomUsersLines(req, res) {
    Room.findById(req.params.id)
        .then(room => {
            let lines = room.lines.filter(line => line.user_id == req.params.userId);

            res.status(200).
                json(lines);
        }).catch(err => handleError(req, res, 500, err));
}

// Routes
router.route('/')
    .get(getAllRooms);

router.route('/:id')
    .get(getRoomById);

router.route('/:id/lines')
    .get(getRoomLines);

router.route('/:id/lines')
    .post(addRoomLine);

router.route('/:id/users')
    .get(getRoomUsers);

router.route('/:id/users/:userId/lines')
    .get(getRoomUsersLines);

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
