const courses = require("../../models/courses");
const enrollment = require("../../models/enrollment");
const progress= require('../../models/progress')
const lessons=require("../../models/lesson")

exports.allEnrolledStudents=async(req,res)=>{
  try {
    const data=[];
    const userId=req.session.user.id;
    const allCourseData= await courses.find({$or:[{creatorId:userId},{instructor:userId}]});
    for( c of allCourseData){
      const students=await enrollment.find({courseId:c._id}).populate(['studentId','courseId']);
      data.push(students)
    }

    res.status(200).json({data:data})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}
exports.getStudentsProgress = async (req, res) => {
  try {
    const userId = req.session.user.id;

    // 1️⃣ Get all courses created or taught by user
    const allCourses = await courses.find({
      $or: [{ creatorId: userId }, { instructor: userId }]
    }).populate(['creatorId', 'instructor']);

    const courseIds = allCourses.map(c => c._id);

    // 2️⃣ Get all enrollments for those courses
    const allEnrollments = await enrollment.find({
      courseId: { $in: courseIds }
    }).populate(['studentId', 'courseId']);

    // 3️⃣ Get all progress for those courses
    const allProgress = await progress.find({
      courseId: { $in: courseIds }
    });

    // 4️⃣ Get lesson counts per course (OPTIMIZED)
    const lessonCounts = await lessons.aggregate([
      {
        $match: { courseId: { $in: courseIds } }
      },
      {
        $group: {
          _id: "$courseId",
          totalLessons: { $sum: 1 }
        }
      }
    ]);

    // Convert lessonCounts → map
    const lessonMap = {};
    lessonCounts.forEach(l => {
      lessonMap[l._id.toString()] = l.totalLessons;
    });

    // 5️⃣ Create progress map for fast lookup
    const progressMap = {};
    allProgress.forEach(p => {
      progressMap[`${p.userId}_${p.courseId}`] = p;
    });

    // 6️⃣ Build final data
    const data = allEnrollments.map(enroll => {
      const courseId = enroll.courseId._id.toString();
      const studentId = enroll.studentId._id.toString();

      const courseData = allCourses.find(
        c => c._id.toString() === courseId
      );

      const lessonCount = lessonMap[courseId] || 0;

      const studentProgress =
        progressMap[`${studentId}_${courseId}`] || null;

      const progressPercent = studentProgress
        ? (studentProgress.completedLessons / lessonCount) * 100
        : 0;

      return {
        course: courseData,          //  FULL COURSE DATA
        student: enroll.studentId,   //  STUDENT DATA
        enrollment: enroll,          //  ENROLLMENT DATA
        lessonCount,                 // TOTAL LESSONS
        progress: studentProgress,   // PROGRESS DATA
        progressPercent: Math.round(progressPercent) // ✅ %
      };
    });

    res.status(200).json({ data:data });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteEnrollment=async(req,res)=>{
  try {
    const userId= req.session.user.id;
    const enrollmentId=req.params.enrollmentId;
    const enrollmentData= await enrollment.findOne({_id:enrollmentId});
          await enrollment.findOneAndDelete({_id:enrollmentId});
          await progress.findOneAndDelete({courseId:enrollmentData.courseId,userId:enrollmentData.studentId})
    res.status(200).json({success:true,message:"Deleted!"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}