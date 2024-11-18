const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
})

const List = mongoose.model("List", ListSchema)

module.exports = List
