const { validationResult } = require('express-validator');

const User = require('../models/User');;

// index, show, store, update, delete
module.exports = {
    async store(req, res) {
        const errors = validationResult(req);
        
        if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
        
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user)
            user = await User.create({ email });

        return res
            .status(201)
            .json({ message: 'User created', user });
    },
}