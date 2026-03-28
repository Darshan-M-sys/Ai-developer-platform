const express = require("express");
const connectedDb = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRoute");
require("dotenv").config();
const cors=require("cors")
const {MongoStore}=require("connect-mongo")
const path=require("path");
const chatRouter = require("./routes/chatRoute");
const snippetsSaveRouter = require("./routes/snippetsSaveRoute");
const codeRunner = require("./routes/codeRunnerRoute");
const aiPlayground = require("./routes/AiPlaygroundRoute");
const {runAi} =require("./config/aiRunCommend");
const adminDashboardRoute = require("./routes/AdminDashboardRoute");
const publicCourseRoute = require("./routes/publicCourseRoute");
const enrollmentRouter = require("./routes/EnrollmentRoute");
const learnerDashboardRoute = require("./routes/LearnerDashboardRoute");
const app = express();
// runAi()
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
    

// =========================
// CONNECT DATABASE
// =========================
connectedDb();

// =========================
// MIDDLEWARE
// =========================
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// SESSION CONFIG
// =========================
app.use(
  session({
    secret: process.env.SECRET_KEY,   // change in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // true only in production (https)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store:MongoStore.create({mongoUrl:process.env.MONGODB_URL,
      ttl:"60*60*24"
    })
  })
);

// =========================
// PASSPORT CONFIG
// =========================
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

// =========================
// ROUTES
// =========================
app.use("/api/auth", authRouter);
app.use("/ai/chat", chatRouter);
app.use("/snippets", snippetsSaveRouter);
app.use("/code",codeRunner);
app.use("/ai/playground",aiPlayground);
app.use("/admin",adminDashboardRoute);
app.use("/public",publicCourseRoute);
app.use("/student",enrollmentRouter);
app.use("/student",learnerDashboardRoute);


// =========================
// SERVER START
// =========================
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});