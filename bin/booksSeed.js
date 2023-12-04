const mongoose = require('mongoose');
const Book = require('../models/Book.model');
const { books } = require('../public/js/books.json');
require('../config/db.config');

mongoose.connection.once('open', () => {
  mongoose.connection.dropCollection('books')
    .then(() => {
      console.log('DB cleared');
    })
    .then(() => {
      return Book.create(books);
    })
    .then((booksCB) => {
      booksCB.forEach(book => console.log(`${book.title} has been created`));
    })
    .catch(err => console.error(err))
    .finally(() => {
      mongoose.connection.close()
      .then(() => {
        console.log('End of seeds');
      })
      .catch((err) => console.error('Error while disconnecting', err))
      .finally(() => process.exit(0))
    })
})
