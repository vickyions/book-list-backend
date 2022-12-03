const router = require("express").Router();
const User = require("../models/User");

const {hash} = require("bcrypt");
const SALT_ROUNDS = 10;

router.get("/", (req, res) => res.send("<h2>Register</h2>"))
router.post("/", async (req, res) => {
    try {
        const {username, password} = req.body;

        //check if username is unique or not
        const result = await User.find({username});

        if (result.length > 0) {
           return res.status(400).json({
                status: "failed",
                message: "Username not unique",
                error: "Username already exists use different username"
            })
        }

        const hashedPass = await hash(password, SALT_ROUNDS);
        const user = await User.create({username, password: hashedPass});
        res.status(200).json({
            status: "success",
            message: "User successfully registered",
            user: await User.find({username: user.username}, {password: 0})
        })
    } catch(err) {
        res.status(500).json({
            status: "failed",
            message: "Some server error",
            error: err.message
        })
    }
});

module.exports = router;
