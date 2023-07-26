// dependencies
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.mongoLink,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
  }
// Create Model
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String
});
// Export Model
User.plugin(passportLocalMongoose);

module.exports = mongoose.model('userData', User, 'userData');