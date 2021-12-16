import AWS from 'aws-sdk'

import User from "../../models/user.js"
import { deleteFileFromAWS, uploadFileToAWS } from '../../utils/s3.utils.js';


//property decoded is created by jwtParser() from /utils

export const getUserData =async(req, res, next)=> {
    const user = await User.findById(req.decoded.id);
    res.send(user)
};

export const setUserData= async (req, res, next)=> {
    const {name} = req.body

    //check uniqueness
    const userWithSameName = await User.findOne({name})
    if (userWithSameName) {
        if (userWithSameName._id == req.decoded.id) return res.status(400).send('It\'s already your name')
        return res.status(400).send('Name should be unique')
    }

    await User.findByIdAndUpdate(req.decoded.id, {name})
    res.send('user data set successfully')
}


export const updateUserData= async (req, res, next)=> {
    res.send('user data updated successfully')
}

export async function setAvatar(req, res) {
    console.log(req.files)
   const avatar = req.files.avatar
   const fileName = `${Date.now()}${req.files.avatar.name}`

   //upload new avatar and delete previous
   await uploadFileToAWS({...avatar, name: fileName})
   const currentUser = await User.findById(req.decoded.id)
   if (currentUser.avatar && (!(currentUser.avatar === process.env.DEFAULT_AVATAR))) deleteFileFromAWS(currentUser.avatar)
  
   //change avatar in db
   currentUser.avatar = fileName
   await currentUser.save()

   res.send('Avatar successfully changed')
}

export async function getAllUsers(req, res) {
    const users = await User.find();
    res.send(users)
};

export async function activateUser(req, res) {
    let token = req.query.id
    let token_cookie = req.cookies.jwt;
    console.log(token);
    console.log(token_cookie);
    if (token === token_cookie) {
        let id = req.decoded.id;
        await User.findByIdAndUpdate(id, { $set: { active: true } });
        res.send('Verify done success');
    }

    else { res.send('Token doesnt match') }
};

