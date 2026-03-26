const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null, // null if user logs in using GitHub
    },

    githubId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },
    phone:{
      type:String
    },
    bio:{
      type:String,
      default:"This user has not added a bio yet."
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);