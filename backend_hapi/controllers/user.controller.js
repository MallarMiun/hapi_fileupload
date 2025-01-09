const User = require('../models/user.model');
require("dotenv").config();

exports.getAllUsers = async (request, h) => {
    try {
        const users = await User.find();
        return h.response(users).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.getUserById = async (request, h) => {
    try {
        const user = await User.findById(request.params.id);
        return h.response(user).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.createUser = async (request, h) => {
    try {
        const {username} = request.payload

        const user = new User({
            username
        })

        const savedUser = await user.save();
        return h.response(savedUser).code(201);
    } catch (error) {
        console.error(error); // Logga felet för felsökning
        return h.response({ message: error.message }).code(500); // Skicka ett objekt med felmeddelandet
    }
};

exports.updateUser = async (request, h) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return h.response(updatedUser).code(200);
    } catch (error) {
        return h.response(error).code(500);
    }
};

exports.deleteUser = async (request, h) => {
    try {
        await User.findByIdAndDelete(request.params.id);
        return h.response().code(204);
    } catch (error) {
        return h.response(error).code(500);
    }
};

