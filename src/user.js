const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserScema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: 'Not a valid phone number!'
          }
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v)
            },
            message: 'Not a valid email'
        },
        required: [true, "Email is required"]
    }
})

const User = mongoose.model('user', UserScema);

module.exports = User;