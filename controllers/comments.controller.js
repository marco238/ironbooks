const Comment = require('../models/Comment.model');

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);

  const commentToCreate = req.body;
  commentToCreate.user = req.session.currentUser._id;
  commentToCreate.book = req.params.id;

  Comment.create(req.body)
    .then(book => {
      res.redirect(`/books/${req.params.id}`);
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then((comment) => {
      res.redirect(`/books/${comment.book}`);
    })
    .catch(next)
}
