import Vue from 'vue'
import Router from 'vue-router'

// unauthentication components
import Home from '../components/Home'
import LoginStudent from '../components/LoginStudent'
import LoginTeacher from '../components/LoginTeacher'
import AllNotice from '../components/AllNotice'

// administrator component
import Login from '../components/admin/Login'
import Dashboard from '../components/admin/Dashboard'
import Upload from '../components/admin/system/Upload'
import SchoolYear from '../components/admin/system/SchoolYear'
import Statistic from '../components/admin/system/Statistic'
import ManageYear from '../components/admin/system/ManageYear'
import Manual from '../components/admin/system/Manual'
import ManageTeacher from '../components/admin/system/ManageTeacher'
import NoticeAdmin from '../components/admin/system/Notice'
import SeatTeacher from '../components/admin/system/SeatTeacher'

// teacher component
import TeacherDashBoard from '../components/teacher/Dashboard'
import Notice from "../components/teacher/system/Notice"
import Profile from '../components/teacher/system/Profile'
import RegYear from '../components/teacher/system/RegYear'

// student component
import StudentDashboard from '../components/student/Dashboard'
import SelectProject from '../components/student/system/SelectProject'
import ViewProfile from '../components/student/system/ViewProfile'
import ViewProject from '../components/student/system/ViewProject'
import StudentProfile from '../components/student/system/Profile'
import Notifications from '../components/student/system/Notifications'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/slogin',
            component: LoginStudent
        },
        {
            path: '/tlogin',
            component: LoginTeacher
        },
        {
            path: '/alogin',
            component: Login,
        },
        {
            path: '/allNotice',
            component: AllNotice,
        },
        {
            // admin route
            path: '/admin/:id',
            component: Dashboard,
            children: [
                {
                    path: '',
                    redirect: 'schoolyear'
                },
                {
                    path: 'schoolyear',
                    component: SchoolYear
                },
                {
                    path: 'upload',
                    component: Upload
                },
                {
                    path: 'statistic',
                    component: Statistic
                },
                {
                    path: 'manage',
                    component: ManageYear
                },
                {
                    path: 'manual',
                    component: Manual
                },
                {
                    path: 'teacher',
                    component: ManageTeacher
                },
                {
                    path: 'notice',
                    component: NoticeAdmin
                },
                {
                    path: 'seat',
                    component: SeatTeacher
                }
            ]
        },
        {
            // teacher route
            path: '/teacher/:id',
            component: TeacherDashBoard,
            children: [
                {
                    path: '',
                    redirect: 'notice'
                },
                {
                    path: 'notice',
                    component: Notice
                },
                {
                    path: 'profile',
                    component: Profile
                },
                {
                    path: 'reg',
                    component: RegYear
                }
            ]
        },
        {
            // student route
            path: '/student/:id',
            component: StudentDashboard,
            children: [
                {
                    path: '',
                    redirect: 'select'
                },
                {
                    path: 'select',
                    component: SelectProject
                },
                {
                    path: 'teacher',
                    component: ViewProfile
                },
                {
                    path: 'project',
                    component: ViewProject
                },
                {
                    path: 'profile',
                    component: StudentProfile
                },
                {
                    path: 'notifications',
                    component: Notifications
                }
            ]
        }
     ]
})