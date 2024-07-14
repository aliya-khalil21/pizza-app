const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Change Number to String for hashed password
    role: { type: String, default: 'customer' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);  // Change Menu to User
module.exports = User;  // Change Menu to User
