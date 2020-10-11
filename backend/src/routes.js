const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');

const uploadConfig = require('./config/upload');


const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const upload = multer(uploadConfig);

const routes = express.Router();

routes.post('/sessions', [
    body('email').isEmail()
], SessionController.store);

routes.get('/spots', SpotController.index)
routes.post(
    '/spots',
    upload.single('thumbnail'),
    [
        body('price').isFloat(),
        body('company').isString()
    ],
    SpotController.store
);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', [
    body('date', 'Date must be on YYYY/MM/DD').isDate()
], BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;