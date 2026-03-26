const mongoose = require("mongoose");

/* ==============================
   MESSAGE SCHEMA
============================== */

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true
  },

  content: {
    type: String,
    required: true
  },

  // if message contains code
  isCode: {
    type: Boolean,
    default: false
  },

  // language of the code (js, python, sql, etc.)
  codeLanguage: {
    type: String,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


/* ==============================
   CHAT SCHEMA
============================== */

const chatSchema = new mongoose.Schema({

  // which user this chat belongs to
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // chat title (example: "React login help")
  title: {
    type: String,
    default: "New Chat"
  },

  // which AI model used
  model: {
    type: String,
    default: "deepseek-coder"
  },

  // messages inside chat
  messages: [messageSchema],

  // allow pinning important chats
  isPinned: {
    type: Boolean,
    default: false
  },

  // soft delete (instead of removing permanently)
  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);