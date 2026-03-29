const progress = require("../../models/progress");

exports.createCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.id;
    // Check if progress already exists for this user and course
    let Progress = await progress.findOne({ userId, courseId });
     
    if (Progress) {
      return res.status(400).json({ success: false, message: "Progress already exists for this course" });
    }
    // Create new progress document
    Progress = new progress({
      userId,
      courseId,
      completedLessons: [],
      lessonProgress: [],
      courseCompletion: 0,
      currentLesson: null,
    });
    await Progress.save();
    res.status(201).json({ success: true, message: "Course progress created successfully" });

  }catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getCourseProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.id;
    const progressData = await progress.findOne({ userId, courseId }).populate("currentLesson").populate("completedLessons").populate("lessonProgress.lessonId"); 
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    } 
    res.status(200).json({ success: true, data: progressData });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } 
};

exports.updateLessonProgress = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.id;
    const totalLessons = await lesson.countDocuments({ courseId });
    const { lessonId, progress: lessonProgress } = req.body;
    let progressData = await progress.findOne({ userId, courseId });
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    } 
    // Update lesson progress
    const existingLessonProgress = progressData.lessonProgress.find(lp => lp.lessonId.toString() === lessonId);
    if (existingLessonProgress) {
      existingLessonProgress.progress = lessonProgress;
    } else {
      progressData.lessonProgress.push({ lessonId, progress: lessonProgress });
    } 
    // Update completed lessons and course completion
    if (lessonProgress === 100) {
      if (!progressData.completedLessons.includes(lessonId)) {
        progressData.completedLessons.push(lessonId);
      }
    } else {  
      progressData.completedLessons = progressData.completedLessons.filter(id => id.toString() !== lessonId);
    }

  
    const completedLessons = progressData.completedLessons.length;
    progressData.courseCompletion = totalLessons >
     0 ? (completedLessons / totalLessons) * 100 : 0;
    await progressData.save();
    res.status(200).json({ success: true, message: "Lesson progress updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } 
};

exports.setCurrentLesson = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.id;
    const { lessonId } = req.body;
    let progressData = await progress.findOne({ userId, courseId });  
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    } 
    progressData.currentLesson = lessonId;
    await progressData.save();
    res.status(200).json({ success: true, message: "Current lesson updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } 
};

exports.getOverallProgress = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const progressData = await progress.find({ userId }).populate("courseId").populate("currentLesson");
    res.status(200).json({ success: true, data: progressData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProgressByCourse = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const courseId = req.params.courseId;
    const progressData = await progress.findOne({ userId, courseId }).populate("courseId").populate("currentLesson");
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    } 
    res.status(200).json({ success: true, data: progressData });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


exports.getProgressByLesson = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;
    const progressData = await progress.findOne({ userId, courseId }).populate("courseId").populate("currentLesson").populate("lessonProgress.lessonId");
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    }
    const lessonProgress = progressData.lessonProgress.find(lp => lp.lessonId._id.toString() === lessonId);
    if (!lessonProgress) {
      return res.status(404).json({ success: false, message: "Progress not found for this lesson" });
    }
    res.status(200).json({ success: true, data: lessonProgress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } 
};

exports.unMarkLessonComplete = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.session.user.id;
    const { lessonId } = req.body;
    let progressData = await progress.findOne({ userId, courseId });
    if (!progressData) {
      return res.status(404).json({ success: false, message: "Progress not found for this course" });
    } 
    progressData.completedLessons = progressData.completedLessons.filter(id => id.toString() !== lessonId);
    const totalLessons = await lesson.countDocuments({ courseId });
    const completedLessons = progressData.completedLessons.length;
    progressData.courseCompletion = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    await progressData.save();
    res.status(200).json({ success: true, message: "Lesson marked as incomplete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  } 
};