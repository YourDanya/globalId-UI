import User from "../../models/user.js"


//property decoded is created by jwtParser() from /utils

export const getUserData =async(req, res, next)=> {
    const user = await User.findById(req.decoded.id);
    res.send(user)
};

export const setUserData= async (req, res, next)=> {
    await User.findByIdAndUpdate(req.decoded.id, req.body)
    res.send('user data set successfully')
}

export const updateUserData= async (req, res, next)=> {
    res.send('user data updated successfully')
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

