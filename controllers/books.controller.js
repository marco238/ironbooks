const Book = require('../models/Book.model');

module.exports.list = function(req, res, next) {
  Book.find()
    .then(books => res.render("books/list", { books }))
    .catch(error => next(error));
}
