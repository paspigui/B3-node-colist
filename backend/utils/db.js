const mongoose = require("mongoose")

const MONGO_URI = "mongodb://localhost:27017/colist"

async function connection() {
  try {
    await mongoose.connect(MONGO_URI, {})
    console.log("connected to mongoDB")
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports.MONGO_URI = MONGO_URI

module.exports.connection = connection
