const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    avatarUrl: {
        type: String,
        trim: true
    }
})


UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
} )

UserSchema.methods.comparePassword = async function (pwdIngresado){
    return await bcrypt.compare(pwdIngresado, this.password);
};

UserSchema.methods.getToken = async function (){
    return jwt.sign( {id:this.id}, process.env.JWT_TOKEN,{
        expiresIn: 3600
    });
}

module.exports = mongoose.model('User', UserSchema);