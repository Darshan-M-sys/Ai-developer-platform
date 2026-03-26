const express = require("express");
const chatRouter = express.Router();

const {
  sendMessage,
  getAllChats,
  getSingleChat,
  deleteChat,
  pinChat
} = require("../controllers/chatController");
const isAuthenticated = require("../middlewares/authMiddleware");


/* ============================
   1. SEND MESSAGE TO AI
   (create chat if not exists)
============================ */

chatRouter.post("/send",isAuthenticated, sendMessage);


/* ============================
   2. GET ALL CHATS (sidebar)
============================ */

chatRouter.get("/",isAuthenticated, getAllChats);


/* ============================
   3. GET SINGLE CHAT
============================ */

chatRouter.get("/:chatId",isAuthenticated, getSingleChat);


/* ============================
   4. DELETE CHAT
============================ */

chatRouter.delete("/:chatId",isAuthenticated, deleteChat);


/* ============================
   5. PIN / UNPIN CHAT
============================ */

chatRouter.put("/pin/:chatId", pinChat);


module.exports = chatRouter;