const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['supplierType1', 'supplierType2', 'superAdmin'] },
});

module.exports = mongoose.model('UserAdmin', userSchema);
