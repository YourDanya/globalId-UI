import User from "../../models/user.js"
import bcrypt from 'bcryptjs'
import isEmail from 'isemail'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {
  addJwtCookie
} from '../../utils/jwt.utils.js'
import mailto from '../../configs/mailto.js'

dotenv.config({
  path: './src/.env'
})



export const signUp = async (req, res) => {
  let { name, email, password } = req.body;

  //check if user exists
  let user = await User.findOne({ $or: [{ email }, { name } ] })
  if (user) {
    let message
    let doesEmailExist
    let doesNameExist
    if (user.email == email) {
      doesEmailExist = true
      message = 'Email is already registered'
    }
    if (user.name == name) {
      doesNameExist = true
      message = 'Name should be unique'
    }
    if (doesEmailExist && doesNameExist) message = 'You already have an account'
    return res.status(400).send(message);
  }

  //create user
  const hasdPsw = await bcrypt.hash(password, 12).catch(err => res.status(400).send('Password is required'))
  user = new User({
    name,
    email,
    password: hasdPsw,
    data: {
      clicks: 0
    }
  });

  //save user && send response
  await user.save()
    .then(() => {
      addJwtCookie(res, user._id);
      console.log(user)
      res.status(200).send('Sign up successfully')
    })
    .catch((err) =>
      res.status(400).send(err.message
        .split(': ').slice(-1)[0]
      )
    );
};



export const login = async (req, res) => {
  let { name, password} = req.body;
  console.log(req.body)
  if (!name) {
    return res.status(400).send('Name is required')
  }

  //find user
  let user  = await User.findOne({ $or: [{ name }, {email: name}]})
  if (!user) {
    return res.status(400).send('User doesn\'t exist');
  }

  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Password incorrect');
  }

  addJwtCookie(res, user._id)
  res.status(200).send('Log in successful')
};



export const loginWithGoogle = async (req, res) => {
  const { name, email, picture } = req.credentials
  const user = await User.findOneAndUpdate({ email }, { $setOnInsert: { name: email, email, avatar: picture, realName: name } }, { upsert: true, new: true }) //find or create

  if (!user) return res.status(500).send('Error: unable to log in with Google')

  addJwtCookie(res, user._id)
  res.status(200).send('Logged in successfully')
}



export const logout = (req, res) => {
  res.clearCookie('jwt')
  res.status(200).send('Log out successful');
};
