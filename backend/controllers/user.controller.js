const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');

module.exports.registerUser = async (req, res, next) =>{
    const errors = validationResult(req); // if we get any error due to express-validator body validation, errors will store them
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    // Exclude password from the user object in the response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ token, user: userResponse });
}