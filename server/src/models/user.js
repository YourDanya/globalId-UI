import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name already exists"]
  },
  realName: String, 
  avatar: String,
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
  }
});
userSchema.post('save', function(error, doc, next) {
  if ((error.name === 'MongoError' || error.name === 'MongoServerError') && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
  
}); 

const User = mongoose.model("User", userSchema);

export default User;