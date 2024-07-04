const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require('../config/keys');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: false
            }
        }
    ],
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})


//hashing of password
userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 12);
        this.cpassword = await bcryptjs.hash(this.cpassword, 12);
    }
    next();
});

//generating web token
userSchema.methods.generateAuthToken = async function() {
    try {
        // let token1 = jwt.sign({_id: this._id}, JWT_SECRET);
        let token1 = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token1});
        await this.save();
        return token1;
    } catch (error) {
        console.log(error);
    }
}

//store the message
userSchema.methods.addMess = async function(name, email, phone, message){
    try {
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error);
    }
}

//collection creation
const User = mongoose.model('USER', userSchema);

module.exports = User;//export at bottom