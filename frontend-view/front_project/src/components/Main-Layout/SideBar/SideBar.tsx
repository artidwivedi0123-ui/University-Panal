"use client";
import style from "./sidebar.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  CourseManaged,
  Courses,
  DashboardImg,
  Fees,
  FeesDash,
  IdCard,
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
      title:"Course",
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
      title: "Subjects",
      route: UNIVERSITYROUTES.SUBJECTS,
      image: Subject,
    },
     {
      title:"Subject Information",
      route:UNIVERSITYROUTES.SUBJECTDASHBOARD,
      image:SubDash
    },
    {
      title: "Student",
      route: UNIVERSITYROUTES.STUDENTS,
      image: Students,
    },
      {
      title:"Student's Information",
      route:UNIVERSITYROUTES.STUDENTDASHBOARD,
      image:StuDash
    },
    {
      title:"Fee Structure",
      route:"/fee-structure",
      image:Fees
    },
    {
      title:"Fee Structure Retail",
      route:"/fees-dashboard",
      image:FeesDash
    },
    {
      title:"Student Fees ",
      route:"/student-fees",
      image:StudentFees
    },
    {
      title:"Student Profile ",
      route:"/student-details",
      image:IdCard
    }

  
  ];

    const StudentMenus = [
      {
        title:"Student Profile",
        route:"/student-detail",
        image:IdCard
      },
    {
      title:"Student Result",
      route:"/student-result",
      image:MIcon
    },
    {
      title:"About  Subjects",
      route:"/student-subject",
      image:Subject
    }, 
    {
      title:"About  Fees",
      route:"/student-fee",
      image:Fees

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