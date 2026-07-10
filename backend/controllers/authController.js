const jwt = require("jsonwebtoken");

// Login Controller
const loginUser = (req, res) => {

    const { email, password } = req.body;

    // Check Empty Fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    // Dummy User
    if (email === "admin@gmail.com" && password === "123456") {

        // Generate JWT Token
        const token = jwt.sign(
            {
                email: email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: token
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
    });

};

module.exports = {
    loginUser
};