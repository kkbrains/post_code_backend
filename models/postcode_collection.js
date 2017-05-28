const mongoose = require('mongoose');

//All User Schema
const postcodeSchema = mongoose.Schema({
  postcode:{
    type: String,
    required:true
  },
  add_type:{
    type: String,
    required:true
  },
  add_name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required:true
  },
  modified_date: {
    type: Date,
    default: Date.now
  },
  create_date : {
    type: Date,
    default: Date.now
  }
});

const Postcode = module.exports = mongoose.model('postcode_collection', postcodeSchema);

module.exports.saveAdd = function(newPostCodeSchema, callback){
  newPostCodeSchema.save(callback);
}

module.exports.getItemByPostcode = function(postcode, callback){
  const query = {postcode: postcode}
  Postcode.findOne(query, callback);
}

//Get all Users
module.exports.getPostCodeById = function(id, callback){
  Postcode.findById(id, callback);
}
