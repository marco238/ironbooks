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
  image: {
    type: String,
    default: "https://res.cloudinary.com/gargiulo/image/upload/v1611877985/placeholder-1x1-book2_jnmnok.jpg",
  },
}, {
  virtual: true,
});

BookSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "book",
  justOne: false,
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
