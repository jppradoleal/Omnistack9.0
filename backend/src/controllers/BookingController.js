const Booking = require('../models/Booking');
const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        let message = '';

        message = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                    .test(date) ? '' : 'Date must be on DD-MM-YYYY or DD/MM/YYYY';

        const spot_owner = (await Spot.findById(spot_id)).user;
        const user = await User.findById(user_id);
        if(user && !message.length) {
            if(user_id != spot_owner) {
                
                const booking = await Booking.create({
                    user: user_id,
                    spot: spot_id,
                    date,
                });
                
                await booking.populate('spot').populate('user').execPopulate();
                
                const ownerSocket = req.connectedUsers[booking.spot.user];
                
                if(ownerSocket) {
                    console.log(req.connectedUsers[booking.spot.user])
                    req.io.to(ownerSocket).emit('booking_request', booking);
                }
                
                return res.status(202).json(booking);
            } else {
                message = 'Requester cannot be company owner.';
            }
        } else {
            message = message || 'User not found';
        }
            
        return res.status(400).json({
            message
        });
    }
}