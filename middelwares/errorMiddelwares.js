const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // mongooose cast error
    if (err.name == 'casteError') {
        const message = 'Resources Not found '
        error = new errorResponse(message, 404);


    }
    // duplicate key error
    if (err.code == 11000) {
        const message = 'duplicate field value entered'
        error = new errorResponse(message, 400);

    }
    // mongoose validation 
    if (err.name == 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse(message, 400);
        res.status(error.statusCode || 500).json({
            sucess: false,
            error: error.message || 'server Errror',
        });
    }
};
module.exports = errorHandler;