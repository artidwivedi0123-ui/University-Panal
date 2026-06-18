export const COURSE ={
    GETCOURSES:'/api/course',
    CREATECOURSES:'/api/course/create',
    UPDATECOURSE:'/api/course',
    DELTECOURSE:'/api/course'
}

export const SEMESTER ={
    GETSEMESTER:'/api/semester',
    CREATESEMESTER:'/api/semester/create',
    UPDATESEMESTER:'/api/semester',
    DELETESEMESTER:'/api/semester'
}

export const SUBJECT ={
    GETSUBJECT:'/api/subject',
    CREATESUBJECT:'/api/subject/create',
    DELETESUBJCET:'/api/subject',
    UPDATESUBJECT:'/api/subject',
    DASHBOARDSUBJECT:'/api/subject/subject/dashboard'

}

export const STUDENT ={
    GETSTUDENTS : '/api/student',
    CREATESTUDENT:'/api/student/create',
    DELETESTUDENT:'/api/student',
    UPDATESTUDENT:'/api/student',
    DASHBOARDSTUDENT:'/api/student/student/dashboard',
    ALLSTUDENTS:'/api/student/all-students',
}


export const AUTH  = {
    REGISTER:'/auth/register',
    LOGIN:'/auth/login',
    REFRESH:'/auth/refresh',
    LOGOUT:'/auth/logout',
    FORGOTPASSWORD:'/auth/forgot-password/create',
}


export const FEES = {
    CREATEFEES:'/api/fee-structure/create',
    GETALLFEES:'/api/fee-structure/all-fees',
    GETFEES:'/api/fee-structure',
    DELETEFEES:'/api/fee-structure',
    UPDATEFEES:'/api/fee-structure',
    FEESDASHBOARD:'/api/fee-structure/fee-dashboard'
}


export const STUDENTFEES = {
    CREATESTUDFEES:'/api/student-fees/create',
    GETSTUDFEES:'/api/student-fees',
    DELETESTUDFEES:'/api/student-fees',
    UPDATESTUDFEES:'/api/student-fees'
}


export const STUDENTDETAILS ={
    GETSTUDENTDETAILS:"/api/stud-detail",
    CREATESTUDENTDETAILS:"/api/stud-detail/create",
}


export const STUDENTPROFILE ={
    GETSTUDENTPROFILE:'/api/stud/profile'
}