const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'admin' }
});

// Password hashing middleware
// UserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// Compare passwords
// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('Admin', AdminSchema);
