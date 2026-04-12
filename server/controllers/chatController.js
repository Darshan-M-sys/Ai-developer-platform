const axios = require("axios");
const Chat = require("../models/Chat");

    
/* =========================================
   1. SEND MESSAGE TO AI
========================================= */


exports.sendMessage = async (req, res) => {
  try {
    /* ===============================
       1. GET USER DATA
    =============================== */
    const userId = req.session.user.id;
    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let chat;

    /* ===============================
       2. GET EXISTING CHAT (SECURE)
    =============================== */
    if (chatId) {
      // ✅ Only fetch chat that belongs to this user
      chat = await Chat.findOne({ _id: chatId, userId });
    }

    /* ===============================
       3. CREATE NEW CHAT IF NOT FOUND
    =============================== */
    if (!chat) {
      chat = new Chat({
        userId,
        title: message.substring(0, 35),
        messages: []
      });
    }

    /* ===============================
       4. SAVE USER MESSAGE
    =============================== */
    chat.messages.push({
      role: "user",
      content: message
    });

    /* ===============================
       5. SYSTEM PROMPT (AI BEHAVIOR)
    =============================== */
    const systemPrompt = {
      role: "system",
      content: `
You are a helpful AI coding tutor for beginners.

Rules:
- Always use Markdown format
- Use ## headings
- Explain step-by-step
- Always include code examples
- Use proper code blocks (javascript, python, etc.)
- Show output separately
- Keep explanation simple

Important:
- Do NOT write explanation inside code blocks
- Only pure code inside code blocks
`
    };

    /* ===============================
       6. LIMIT CHAT MEMORY (OPTIMIZATION)
    =============================== */
    const lastMessages = chat.messages.slice(-10); // only last 10 messages

    const conversation = [
      systemPrompt,
      ...lastMessages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    /* ===============================
       7. CALL AI API (OPENROUTER)
    =============================== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // ✅ fast + cheap model
        messages: conversation,
        temperature: 0.5,
        max_tokens: 500 // ✅ control response size
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173", // your frontend URL
          "X-Title": "My AI App",
          "Content-Type": "application/json"
        }
      }
    );

    /* ===============================
       8. EXTRACT AI RESPONSE (FIXED)
    =============================== */
    const aiReply =
      response.data.choices?.[0]?.message?.content || "No response";

    /* ===============================
       9. SAVE AI MESSAGE
    =============================== */
    chat.messages.push({
      role: "assistant",
      content: aiReply
    });

    await chat.save();

    /* ===============================
       10. SEND RESPONSE TO FRONTEND
    =============================== */
    res.json({
      reply: aiReply,
      chatId: chat._id,
      title: chat.title
    });

    /* ===============================
       🔥 OPTIONAL: OLLAMA (LOCAL AI)
       Uncomment below to use Ollama instead of OpenRouter
    =============================== */

    /*
    const ollamaResponse = await axios.post("http://localhost:11434/api/chat", {
      model: "phi3:mini", // or llama3, mistral
      messages: conversation,
      stream: false
    });

    const aiReply = ollamaResponse.data.message.content;
    */

  } catch (error) {
    console.log("AI ERROR:", error.response?.data || error.message);

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