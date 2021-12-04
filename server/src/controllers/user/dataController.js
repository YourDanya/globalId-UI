import User from "../../models/user.js"


//property decoded is created by jwtParser() from /utils

export async function getUserData(req, res, next) {
    const user = await User.findById(req.decoded.id);
    res.send(user)
};

export async function setUserData(req, res) {
    const data = req.body
    User.updateOne({ _id: req.decoded.id }, {
        $set: { data }
    })
    res.send('user data set successfully')
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
    if (token == token_cookie) {
        let id = req.decoded.id;
        await User.findByIdAndUpdate(id, { $set: { active: true } });
        res.send('Verify done success');
    }

    else { res.send('Token doesnt match') }
};
