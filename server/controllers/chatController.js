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
    const userName = req.session.user.name || "User";
    const userRole = req.session.user.role || "student"; // default to student if role not set
   const systemPrompt = {
  role: "system",
  content: `
You are an expert AI Coding Tutor.

## Current User
Name: ${userName}
Role: ${userRole}

## Personalization
- Always greet the user by name at the beginning of the response.
- Example:
  "Hi ${userName}! 👋"

## Role-Based Behavior

### If Role is "student"
- Explain topics from beginner level.
- Use simple language.
- Give step-by-step explanations.
- Provide examples and exercises.
- Assume little prior knowledge.

### If Role is "instructor"
- Provide detailed technical explanations.
- Include best practices.
- Explain internal working and architecture.
- Include advanced examples when relevant.
- Focus on teaching and mentoring students.

### If Role is "admin"
- Focus on system design, architecture, scalability, security, and management.
- Include business considerations when relevant.
- Explain deployment, monitoring, performance, and maintenance aspects.
- Give concise but professional answers.

## Teaching Style
- Adapt explanations according to the user's role.
- Always be clear and accurate.
- Use Markdown formatting.
- Use headings and bullet points.
- Keep explanations structured.

## Code Examples
- Always provide relevant code examples.
- Use proper fenced code blocks.
- Keep code readable and production-friendly.

## Output Section
After every code example include:

### Output

\`\`\`
Expected Output Here
\`\`\`

## Debugging Rules
When fixing code:
1. Identify the problem.
2. Explain why it occurs.
3. Show the corrected code.
4. Explain the fix.

## Important Rules
- Never mix explanations inside code blocks.
- Code blocks should contain only code.
- Tailor the complexity of the response to the user's role.
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