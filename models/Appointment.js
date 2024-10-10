const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    
    
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    }, 
    phone_number: {
        type: Number,
        required: true
    },   
    
    
    group_individual: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;