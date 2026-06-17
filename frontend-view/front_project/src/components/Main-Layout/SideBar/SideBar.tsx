"use client";
import style from "./sidebar.module.scss";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  CourseManaged,
  Courses,
  DashboardImg,
  Fees,
  FeesDash,
  MIcon,
  Semester,
  StuDash,
  StudentFees,
  Students,
  SubDash,
  Subject,
  UniversityLogo,
} from "@/src/assets";
import { UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import { useAuth } from "@/src/context/AuthContext";
import { title } from "process";


export default function Sidebar() {
  const {user} = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const AdminMenus = [
     {
      title:"Dashboard",
      route:UNIVERSITYROUTES.UNIVERSITYDASHBOARD,
      image:DashboardImg
    },
    {
      title:"Course Mangement",
      route:"/course",
      image:CourseManaged,
    },
    {
      title: "Available Courses",
      route: UNIVERSITYROUTES.COURSES,
      image: Courses,
    },
    {
      title: "Available Semesters",
      route: UNIVERSITYROUTES.SEMESTERS,
      image: Semester,
    },
    {
      title: "Subjects Management",
      route: UNIVERSITYROUTES.SUBJECTS,
      image: Subject,
    },
     {
      title:"Subject Dashboard",
      route:UNIVERSITYROUTES.SUBJECTDASHBOARD,
      image:SubDash
    },
    {
      title: "Students Management",
      route: UNIVERSITYROUTES.STUDENTS,
      image: Students,
    },
      {
      title:"Student Dashboard",
      route:UNIVERSITYROUTES.STUDENTDASHBOARD,
      image:StuDash
    },
    {
      title:"Fee Structure Management",
      route:"/fee-structure",
      image:Fees
    },
    {
      title:"Fee Structure Dashboard",
      route:"/fees-dashboard",
      image:FeesDash
    },
    {
      title:"Student Fees Management",
      route:"/student-fees",
      image:StudentFees
    }

  
  ];

    const StudentMenus = [

    {
      title: "Available Courses",
      route: UNIVERSITYROUTES.COURSES,
      image: Courses,
    },
    {
      title: "Available Semesters",
      route: UNIVERSITYROUTES.SEMESTERS,
      image: Semester,
    },
    {
      title:"Student Profile",
      route:"/student-profile",
      image:MIcon
    },
    {
      title:" Student Subjects",
      route:"/student-subject",
      image:Subject
    },
    
    {
      title:"Student Fees",
      route:"/student-fee",
      image:Fees
    },
    
    
  
  ];

  const menus = user?.role === "admin" ? 
      AdminMenus
    : StudentMenus;

  return (
    <div className={style["sidebar"]}>
      <div className={style["menu-container"]}>
              <Image  onClick={()=>router.push("/")}
              className={style["image"]}
              src={UniversityLogo}
              width={90}
              height={90}
              alt="University"
              loading="eager"

            />
        {
          menus.map((menu, index) => (
            <div
              key={index}
              className={
                pathname === menu.route
                  ? style["active-menu"]
                  : style["menu"]
              }
              onClick={() =>
                router.push(menu.route)
              }
            >

              <Image
                src={menu.image}
                width={28}
                height={28}
                alt="menu-image"
              />

              <span>
                {menu.title}
              </span>

            </div>

          ))
        }

      </div>

    </div>
  );
}