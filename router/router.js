const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const booksController = require("../controllers/books.controller");
const commentsController = require("../controllers/comments.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../config/storage.config");
const passport = require('passport');

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

router.get("/", authMiddleware.isAuthenticated, (req, res, next) => {
  res.render("home");
});

// auth
router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

// Google auth
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

// users
router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

// books
router.get("/books", authMiddleware.isAuthenticated, booksController.list);
router.get("/books/create", authMiddleware.isAuthenticated, booksController.create);
router.post("/books/create", authMiddleware.isAuthenticated, upload.single('image'), booksController.doCreate);
router.get("/books/:id", authMiddleware.isAuthenticated, booksController.details);
router.get("/books/:id/delete", authMiddleware.isAuthenticated, booksController.delete);
router.get("/books/:id/update", authMiddleware.isAuthenticated, booksController.update);
router.post("/books/:id/update", authMiddleware.isAuthenticated, upload.single('image'), booksController.doUpdate);

// comments
router.get("/comments/:id/delete", authMiddleware.isAuthenticated, commentsController.delete);
router.post("/comments/:id/create", authMiddleware.isAuthenticated, commentsController.doCreate);

module.exports = router;
