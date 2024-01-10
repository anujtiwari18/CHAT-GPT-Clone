const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected To Mongodb Database`)

    } catch (error) {
        console.log(`Mongodb database error ${error}`.bgRed.white)
    }
}
module.exports = connectDB;