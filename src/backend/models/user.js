const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  favorites: [{type: Schema.Types.ObjectId, ref: 'fav'}]
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);