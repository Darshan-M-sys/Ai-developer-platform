const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    // Which course this lesson belongs to
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // Lesson title
    title: {
      type: String,
      required: true,
      trim: true,
    },
    percentage:{
      type:Number,
      required:true,

    },

    // Lesson description (short text)
     subDescription: {
      type: String,
      default: "",
    },

    // Lesson content in Markdown format
    description: {
      type: String,
      default: "",
    },

    // Video URL (YouTube / uploaded video)
    videoUrl: {
      type: String,
      default: "",
    },

    // Lesson duration (example: "10 min", "1 hr")
    duration: {
      type: String,
      default: "",
    },

    // Free preview lesson or paid lesson
    isPreview: {
      type: Boolean,
      default: true,
    },

    // Is lesson published or draft
    isPublished: {
      type: Boolean,
      default: true,
    },
    // Created by instructor / admin
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    // Optional: attachments (PDF, code files, etc.)
    attachments: [
      {
        title: String,
        fileUrl: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);