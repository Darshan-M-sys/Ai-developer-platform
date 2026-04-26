const express = require("express");
const passport = require("passport");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  githubSuccess,
  githubFailure,
  updateUser,
  adminLogin,
} = require("../controllers/authController");
const isAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadImageMiddleware");
const { resetPassword } = require("../controllers/resetPasswordController");

const authRouter = express.Router();


/* ===========================
   NORMAL AUTH ROUTES
=========================== */

// register
authRouter.post("/register", registerUser);
// update User
authRouter.put("/update",isAuthenticated,upload.single("image"), updateUser);
// login
authRouter.post("/login", loginUser);
authRouter.post("/reset/password", resetPassword);
// admin login
authRouter.post("/admin/login", adminLogin);

// logout
authRouter.get("/logout", logoutUser);

// get logged-in user
authRouter.get("/me",isAuthenticated, getCurrentUser);



/* ===========================
   GITHUB OAUTH ROUTES
=========================== */

// step 1 → redirect user to GitHub
authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);


// step 2 → GitHub sends user back here
authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:3000/login",
  }),
  githubSuccess
);


// if GitHub login fails
authRouter.get("/github/failure", githubFailure);


module.exports = authRouter;