const UserModel = require ('../models/UserModel');

const signup = (req, res) =>{
    const { username, password, email, avatarUrl } = req.body;

    const dataInsert = {
        username,
        password,
        email,
        avatarUrl
    }

    const insert = UserModel.
}