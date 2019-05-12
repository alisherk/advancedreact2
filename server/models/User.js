const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

//set a user schema that contains email and password
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});
//this function is called before user is saved 
userSchema.pre('save', async function(next) {
  try {
    //generate salt with bcrypt
    const salt = await bcrypt.genSalt(10);
    //encrypt password and add salt
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
      return next(err);
  }
});

//a method that compares passed in password with password in the database
userSchema.methods.comparePassword = async function(data){
  return bcrypt.compare(data, this.password); 
 
}

module.exports = mongoose.model('user', userSchema);


