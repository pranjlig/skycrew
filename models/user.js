const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({  
    name: String,
    email: String,
    location: String,
    oneLiner: String,
    profileImageUrl: String,
    skycrewHandle: String,
    walletAddress: String,
    socialLinks: {
        LinkedIn: String,
        Github: String,
        Twitter: String,
        PersonalWebsite: String
    },
    coursesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    coursesCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});


const User = mongoose.model("User", userSchema);

module.exports = User;