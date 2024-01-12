// JWT token
const errorHandler = require('../middelwares/errorMiddelwares');
const errorResponse = require('../utils/errorResponse');
const userModel = require('../models/usersModels');
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        sucess: true,
        token,

    });

};

//register
exports.registerController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        //existing user
        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return next(new errorResponse('Email is already register', 500))

        }
        const user = await userModel.create({ username, email, password })
        this.sendToken(user, 201, res)

    } catch (error) {
        console.log(error);
        next(error);

    }
};
//LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return next(new errorResponse('Please provide email or password'));

        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid Credtial", 401))
        }
        const isMatch = await userModel.matchPassword(password);
        if (!isMatch) {
            return next(new errorHandler("Invalid Crediitial", 401))
        }
        // res 
        sendToken(user, 200, res);


    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.logoutController = async (req, res) => {
    res.clearcookie('refreshToken')
    return res.status(200).json({
        sucsess: true,
        message: 'Logout sucessful',

    })
}