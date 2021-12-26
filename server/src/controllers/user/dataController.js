import AWS from 'aws-sdk'

import User from "../../models/user.js"
import {deleteFileFromAWS, uploadFileToAWS} from '../../utils/s3.utils.js'
import bcrypt from 'bcryptjs'
import emailjs from 'emailjs-com'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
// import sendgridTransport from 'nodemailer-sendgrid-transport'
// const transporter= nodemailer.createTransport(sendgridTransport({
//     auth: {
//         api_key: process.env.SENDGRID_PASSWORD
//     }
// }))

//property decoded is created by jwtParser() from /utils

export const getUserData = async (req, res, next) => {
    const user = await User.findById(req.decoded.id);
    res.send(user)
};

export const setUserData = async (req, res, next) => {
    const {name} = req.body

    //check uniqueness
    const userWithSameName = await User.findOne({name})
    if (userWithSameName) {
        if (userWithSameName._id === req.decoded.id) return res.status(400).send('It\'s already your name')
        return res.status(400).send('Name should be unique')
    }

    await User.findByIdAndUpdate(req.decoded.id, {name})
    res.send('user data set successfully')
}


export const updateUserData = async (req, res, next) => {
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
        await User.findByIdAndUpdate(id, {$set: {active: true}});
        res.send('Verify done success');
    } else {
        res.send('Token doesnt match')
    }
};

export const updateUserPassword = async (req, res, next) => {
    const user = await User.findById(req.decoded.id)
    if (!(await bcrypt.compare(req.body.currentPassword, user.password))) {
        return res.send('Your current password is wrong.', 401)
    }
    if (req.body.newPassword !== req.body.passwordConfirm) res.send('password and password confirm do not match')
    user.password = await bcrypt.hash(req.body.newPassword, 12)
    await user.save()

    res.send('password updated successfully')
}

export const forgotUserPassword = async (req, res, next) => {
    const user = await User.findById(req.decoded.id)
    if (user.email !== req.body.email) {
        res.send('Your current password is wrong.', 401)
    }

    const resetToken = crypto.randomBytes(32).toString('hex')

    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex').toString()
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000

    await user.save()

    const message = `go to this link to reset your password http://localhost:3000/reset-password/${resetToken}`

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        })

        const mailOptions = {
            from: process.env.MAIL,
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: message
        }

        await transporter.sendMail(mailOptions)

    } catch (err) {
        console.log(err)
        return res.send('something went wrong')
    }

    res.send('reset token send to your email')
}

export const resetUserPassword = async (req, res, next) => {

    const idUser = await User.findById(req.decoded.id)

    console.log(idUser)

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex')
        .toString()

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: new Date()}
    })

    if (!user) {
        console.log('no')
        return res.send('Token is invalid or expired')
    }

    if(req.body.password!==req.body.passwordConfirm){
        return res.send('password and password conform do not match')
    }

    user.password = user.password = await bcrypt.hash(req.body.password, 12)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()
    console.log('yes')
    res.send(`password reset successfully`)
}