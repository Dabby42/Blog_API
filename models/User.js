import mongoose from 'mongoose';

let UserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, index: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

UserSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

let User = mongoose.model('User', UserSchema);

module.exports = User;
