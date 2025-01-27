const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const BlacklistToken = require('../models/blacklistToken.model');

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

module.exports.loginUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await user.comparePassword(password);

    if(!isValid){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    const userResponse = user.toObject();
    res.cookie('token', token);
    delete userResponse.password;

    res.status(200).json({ token, user: userResponse });
}

module.exports.getUserProfile = async (req, res, next) =>{
    const user = req.user;

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ user: userResponse });
}

module.exports.logoutUser = async (req, res, next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({token});
    res.status(200).json({ message: 'Logged out successfully' });
}