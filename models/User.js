const mongoose = require("mongoose")
const {Shema} = mongoose

const userShema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
},
{
    timestamps: true
})

const User = mongoose.model("User", userShema)

module.exports = User