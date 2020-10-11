const { validationResult } = require('express-validator');

const Spot = require('../models/Spot');
const User = require('../models/User');

// index, show, store, update, delete
module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },
    async store(req, res) {
        const errors = validationResult(req);
        
        if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

        const { filename } = req.file;
        const { company, techs, price } = req.body;

        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404)
                .json({ error: 'User doesn\'t exists' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.status(201).json(spot);
    },
}