import mongoose from "mongoose";
import validator from "validator";
import dotenv from 'dotenv'


dotenv.config({ path: './src/.env' })

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name already exists"]
  },
  realName: String, 
  avatar: {
    type: String,
    default: process.env.DEFAULT_AVATAR
  },
  email: {
    type: String,
    unique: [true, "This email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    minlength: 5,
  },
  active: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {
      clicks: Number,
      loses: Number
    }
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
});

// userSchema.pre('save', async function(next) {
//   // Only run this function if password was actually modified
//
//
//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//
//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();
// });

userSchema.post('save', function(error, doc, next) {
  if ((error.name === 'MongoError' || error.name === 'MongoServerError') && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
  
}); 

const User = mongoose.model("User", userSchema);

export default User;