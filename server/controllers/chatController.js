const axios = require("axios");
const Chat = require("../models/Chat");

    
/* =========================================
   1. SEND MESSAGE TO AI
========================================= */

exports.sendMessage = async (req, res) => {
  try {
      
    const userId = req.session.user.id;
    const { message, chatId } = req.body;


    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let chat;

    /* ===============================
       1. GET EXISTING CHAT
    =============================== */
    if (chatId) {
      chat = await Chat.findById(chatId);
    }

    /* ===============================
       2. CREATE NEW CHAT IF NOT EXIST
    =============================== */
    if (!chat) {
      chat = new Chat({
        userId,
        title: message.substring(0, 35),
        messages: []
      });
    }

    /* ===============================
       3. SAVE USER MESSAGE
    =============================== */
    chat.messages.push({
      role: "user",
      content: message
    });

    /* ===============================
       4. SYSTEM PROMPT (IMPORTANT)
    =============================== */
    const systemPrompt = {
      role: "system",
      content: `
You are a helpful AI coding assistant.

Always respond in clean Markdown format using this structure:

1. Use headings (## Title)
2. Use step-by-step explanation
3. Use proper code blocks like:
\`\`\`javascript
code here
\`\`\`
4. Show output separately
5. Keep explanations simple and beginner friendly
don't use comment lines in code
only code don't use extra text inside code 
`
    };

    /* ===============================
       5. PREPARE CONVERSATION MEMORY
    =============================== */
    const conversation = [
      systemPrompt,
      ...chat.messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    /* ===============================
       6. SEND TO OLLAMA
    =============================== */
    const response = await axios.post("http://localhost:11434/api/chat", {
      model: "deepseek-coder",
      messages: conversation,
      stream: false
    });

    const aiReply = response.data.message.content;

    /* ===============================
       7. SAVE AI MESSAGE
    =============================== */
    chat.messages.push({
      role: "assistant",
      content: aiReply
    });

    await chat.save();

    /* ===============================
       8. SEND RESPONSE TO FRONTEND
    =============================== */
    res.json({
      reply: aiReply,
      chatId: chat._id,
      title: chat.title
    });

  } catch (error) {
    console.log("AI ERROR:", error.message);

    res.status(500).json({
      error: "AI server error"
    });
  }
};

/* =========================================
   2. GET ALL CHATS (sidebar)
========================================= */

exports.getAllChats = async (req, res) => {
  try {
     const userId=req.session.user.id;

    const chats = await Chat.find({ userId, isDeleted: false })
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt isPinned");

    res.json({data:chats});
  } catch (error) {
    res.status(500).json({ error: "Error fetching chats" });
  }
};


/* =========================================
   3. GET SINGLE CHAT
========================================= */

exports.getSingleChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error loading chat" });
  }
};


/* =========================================
   4. DELETE CHAT (soft delete)
========================================= */

exports.deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndUpdate(req.params.chatId, {
      isDeleted: true
    });

    res.json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting chat" });
  }
};


/* =========================================
   5. PIN / UNPIN CHAT
========================================= */

exports.pinChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    chat.isPinned = !chat.isPinned;
    await chat.save();
    res.json({ message: "Chat updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating chat" });
  }
};