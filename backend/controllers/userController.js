const getProfile = (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome to CloudVault AI",
        user: req.user
    });

};

module.exports = {
    getProfile
};