const mongoose = require('mongoose')
require('mongoose-type-url');

const { Schema } = mongoose;

const favSchema = new Schema({        
movieID: String,
movieTitle: String,
movieYear: String,
movieImage: String,
userID: String
})

module.exports = mongoose.model('fav', favSchema);  