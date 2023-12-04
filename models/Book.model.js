const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  pages: {
    type: Number,
  },
  genre: {
    type: String,
    enum: ["Fantasy", "Dystopian", "Classic", "Romance", "Mystery Thriller", "Adventure Fiction", "Political Satire", "Thriller", "Other"],
    default: "Other",
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
