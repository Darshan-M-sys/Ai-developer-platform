import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import LearnerDashboard from './pages/LearnerDashboard'
import Courses from './pages/Courses'

import AIChatPage from './pages/AiChatPage'
import ProblemPage from './pages/ProblemPage'
import Profile from './pages/Profile'
import Playground from './pages/Playground'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ManageUsers from './pages/adminDashnoardFeaturespages/ManageUser'
import StudentsPage from './pages/adminDashnoardFeaturespages/StudentsPage'
import InstructorPage from './pages/adminDashnoardFeaturespages/Instructorpage'
import CoursesPage from './pages/adminDashnoardFeaturespages/CoursesPage'
import AnalyticsPage from './pages/adminDashnoardFeaturespages/AnalyticsPage'
import CreateCourse from './pages/adminDashnoardFeaturespages/CreateCourse'
import CourseView from './pages/adminDashnoardFeaturespages/CourseVeiwPage'
import LessonsPage from './pages/adminDashnoardFeaturespages/LessonPage'
import AddLessonPage from './pages/adminDashnoardFeaturespages/AddLessonPage'
import CourseViewPage from './pages/CourseViewPage'
import EnrolledCourses from './pages/LearnerDashboardPages/EnrolledCourses'
import ViewCourseInfo from './pages/LearnerDashboardPages/ViewCourseInfo'
import LearningScreenPage from './pages/LearnerDashboardPages/LearningScreenPage'
import CertificateTemplate from './pages/LearnerDashboardPages/CertificateTemplate'
import CertificatePage from './pages/LearnerDashboardPages/CertificatePage'
import InstructorDashboard from './pages/InstructorDashboard'
import MyCourses from './pages/InstructorDashbaordPages/MyCourses'
import Students from './pages/InstructorDashbaordPages/Students'
import AddCourses from './pages/InstructorDashbaordPages/AddCourses'
import StudentProgressPage from './pages/InstructorDashbaordPages/StudentProgressPage'
import CompletedCertificatesPage from './pages/InstructorDashbaordPages/CompletedCertificatesPage'
import LessonsMainPage from './pages/InstructorDashbaordPages/LessonMainPage'
import AddLesson from './pages/InstructorDashbaordPages/AddLesson'
import CourseInfo from './pages/InstructorDashbaordPages/CourseInfo'
import LiveDemo from './pages/LiveDemo'
import Dashboard from './pages/Dashboard'
import EnrollmentsPage from './pages/adminDashnoardFeaturespages/EnrollmentsPage'
import CertificatesIssued from './pages/adminDashnoardFeaturespages/CertificatesIssued'
import HelpPage from './pages/HelpPage'

import AiRoadmaps from './pages/AiRoadmaps'
import ResetPassword from './pages/ResetPassword'
const App = () => {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reset/password" element={<ResetPassword/>}/>
        <Route path="forget/password" element={<ForgetPassword/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/student/dashboard" element={<LearnerDashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/live/demo" element={<LiveDemo/>}/>
        <Route path="/learner/course/:enrollmentId" element={<ViewCourseInfo/>}/>
        <Route path="/learner/courses" element={<EnrolledCourses/>}/>
        <Route path="/learner/course/:courseId/lesson/:lessonId" element={<LearningScreenPage/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/ai/roadmap" element={<AiRoadmaps/>}/>
        <Route path="/admin/users" element={<ManageUsers/>}/>
        <Route path="/admin/course/create" element={<CreateCourse/>}/>
        <Route path="/admin/students" element={<StudentsPage/>}/>
        <Route path="/admin/instructors" element={<InstructorPage/>}/>
        <Route path="/admin/certificates" element={<CertificatesIssued />}/>
        <Route path="/admin/courses" element={<CoursesPage/>}/>
        <Route path="/admin/enrollments" element={<EnrollmentsPage />}/>
        <Route path="/instructor/dashboard" element={<InstructorDashboard/>}/>
        <Route path="/instructor/courses" element={<MyCourses/>}/>
        <Route path="/instructor/students" element={<Students/>}/>
        <Route path="/instructor/add/course" element={<AddCourses/>}/>
        <Route path="/instructor/course/info/:courseId" element={<CourseInfo/>}/>
        <Route path="/instructor/students/progress" element={<StudentProgressPage/>}/>
        <Route path="/instructor/students/certificates" element={<CompletedCertificatesPage/>}/>
        <Route path="/instructor/course/:courseId/lesson/:lessonId" element={<LessonsMainPage/>}/>
        <Route path="/instructor/lesson/:courseId/" element={<AddLesson/>}/>
        <Route path="/certificate" element={<CertificateTemplate />}/>
        <Route path="/learner/certificate" element={<CertificatePage />}/>
        <Route path="/admin/course/:id" element={<CourseView />}/>
        <Route path="/admin/lesson/:courseId/:id" element={<LessonsPage />}/>
        <Route path="/admin/lesson/add/:courseId" element={<AddLessonPage />}/>
        <Route path="/admin/analytics" element={<AnalyticsPage />}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/course/:id" element={<CourseViewPage/>}/>
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/ai/chat" element={<AIChatPage/>}/>
        <Route path="/problem" element={<ProblemPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/help" element={<HelpPage/>}/>
      </Routes>
    </div>
  )
}

export default App
