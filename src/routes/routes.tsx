import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import LandingPageView from '../views/LandingPageView';

import Admin from "../views/Admin/Login/LoginView";
import AdminHome from "../views/Admin/Home/HomeView";
import AdminLesson from "../views/Admin/Lesson/LessonView";
import AdminLessonList from "../views/Admin/LessonList/LessonListView";
import AdminQuestion from "../views/Admin/Question/QuestionView";
import AdminStudent from "../views/Admin/Student/StudentView";
import AdminStudentList from "../views/Admin/StudentList/StudentListView";

import Student from "../views/Student/Login/LoginView";
import StudentHome from "../views/Student/Home/HomeView";
import StudentLesson from "../views/Student/Lesson/LessonView";

export const RoutesContainer = () => {

    return(
        <Router>
            <Routes>
                <Route path='/' element={<LandingPageView/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='/admin-home' element={<AdminHome/>}/>
                <Route path='/admin-lesson' element={<AdminLesson/>}/>
                <Route path='/admin-lesson-list' element={<AdminLessonList/>}/>
                <Route path='/admin-question' element={<AdminQuestion/>}/>
                <Route path='/admin-student' element={<AdminStudent/>}/>
                <Route path='/admin-student-list' element={<AdminStudentList/>}/>

                <Route path='/student' element={<Student/>}/>
                <Route path='/student-home' element={<StudentHome/>}/>
                <Route path='/student-lesson' element={<StudentLesson/>}/>
            </Routes>
        </Router>
    );
    
}

