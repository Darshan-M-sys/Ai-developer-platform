import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import LearnerDashboard from './pages/LearnerDashboard'
import Courses from './pages/Courses'
import CoursePlayer from './pages/CoursePlayer'
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
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="forget/password" element={<ForgetPassword/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/dashboard" element={<LearnerDashboard/>}/>
        <Route path="/learner/course/:enrollmentId" element={<ViewCourseInfo/>}/>
        <Route path="/learner/courses" element={<EnrolledCourses/>}/>
        <Route path="/learner/course/:courseId/lesson/:lessonId" element={<LearningScreenPage/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/users" element={<ManageUsers/>}/>
        <Route path="/admin/course/create" element={<CreateCourse/>}/>
        <Route path="/admin/students" element={<StudentsPage/>}/>
        <Route path="/admin/instructors" element={<InstructorPage/>}/>
        <Route path="/admin/courses" element={<CoursesPage />}/>
        <Route path="/admin/course/:id" element={<CourseView />}/>
        <Route path="/admin/lesson/:courseId/:id" element={<LessonsPage />}/>
        <Route path="/admin/lesson/add/:courseId" element={<AddLessonPage />}/>
        <Route path="/admin/analytics" element={<AnalyticsPage />}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/course/:id" element={<CourseViewPage/>}/>
        <Route path="/course/player" element={<CoursePlayer/>}/>
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/ai/chat" element={<AIChatPage/>}/>
        <Route path="/problem" element={<ProblemPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
