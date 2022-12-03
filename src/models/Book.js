const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require("./User");

const bookSchema = new Schema({
    userId: {type: ObjectId, ref: User, required: true},
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    published_date: {type: Date, required: true, default: Date.now()},
    publisher: {type: String, required: true}
});

const Book = mongoose.model("books", bookSchema);
module.exports = Book;
