const express = require("express");
const router = express.Router();
const User = require("../models/user")

// login
router.post("/login", async (req, res) => {

    const { walletAddress } = req.body;
    const user = await User.findOne({walletAddress: walletAddress}) 
    return res.json({user: user})

});

// signup
router.post("/signup", async (req, res) => {

    const { walletAddress } = req.body;
    const newUser = new User({walletAddress: walletAddress})
    const savedUser = await newUser.save()
    return res.json({user: savedUser})

});

// update user profile
router.post("/users/:walletAddress/profile", async (req, res) => {

    const {name, email, location, oneLiner, profileImageUrl, skycrewHandle, linkedIn, github, twitter, personalWebsite} = req.body;
    const user = await User.findOneAndUpdate(
        {walletAddress: req.params.walletAddress},
        {name: name.trim(), email: email.trim(), location, oneLiner, profileImageUrl, skycrewHandle, linkedIn, github,twitter,  personalWebsite},
        {new: true, runValidators: true}
    )
    return res.json({user: user});

})

module.exports = router;