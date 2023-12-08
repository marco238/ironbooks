const Book = require('../models/Book.model');

module.exports.list = function(req, res, next) {
  Book.find()
    .then(books => res.render("books/list", { books }))
    .catch(error => next(error));
}

module.exports.details = (req, res, next) => {
  const { id } = req.params;

  Book.findById(id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      }
    })
    .then(book => {
      if (book) {
        res.render('books/details', book);
      } else {
        res.redirect('/books');
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Book.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/books');
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const { id } = req.params;

  Book.findById(id)
    .then(book => {
      const genreEnumValues = Book.schema.path('genre').enumValues;
      res.render('books/form', { book ,genreEnumValues });
    })
    .catch(next)
}

module.exports.doUpdate = (req, res, next) => {
  const { id } = req.params;
  if (req.file) {
    req.body.image = req.file.path;
  }

  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then(book => {
      res.redirect(`/books/${book._id}`);
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const genreEnumValues = Book.schema.path('genre').enumValues;
  res.render('books/form', { genreEnumValues });
}


module.exports.doCreate = (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path;
  }

  Book.create(req.body)
    .then(book => {
      res.redirect(`/books/${book._id}`);
    })
    .catch(next)
}
