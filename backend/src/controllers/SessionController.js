const User = require('../models/User');;

// index, show, store, update, delete
module.exports = {
    index() {

    },
    show() {

    },
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (!user)
            user = await User.create({ email });

        return res
            .status(201)
            .json({ message: 'User created', user });
    },
    update() {

    },
    delete() {

    }
}