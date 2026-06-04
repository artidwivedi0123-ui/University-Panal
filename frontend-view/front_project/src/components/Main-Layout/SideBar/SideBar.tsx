"use client";
import style from "./sidebar.module.scss";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Courses,
  DashboardImg,
  Semester,
  StuDash,
  Students,
  SubDash,
  Subject,
  UniversityLogo,
} from "@/src/assets";


export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const menus = [
     {
      title:"Dashboard",
      route:"/university-dashboard",
      image:DashboardImg
    },
    {
      title: "Courses",
      route: "/courses",
      image: Courses,
    },
    {
      title: "Semesters",
      route: "/semesters",
      image: Semester,
    },
    {
      title: "Subjects",
      route: "/subjects",
      image: Subject,
    },
     {
      title:"Subject Dashboard",
      route:"/subject-dashboard",
      image:SubDash
    },
    {
      title: "Students",
      route: "/students",
      image: Students,
    },
      {
      title:"Student Dashboard",
      route:"/student-dashboard",
      image:StuDash
    },
  
  ];

  return (
    <div className={style["sidebar"]}>
     {/* .sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  overflow-y: auto;
} */}

      <div className={style["menu-container"]}>
              <Image  onClick={()=>router.push("/")}
              className={style["image"]}
              src={UniversityLogo}
              width={90}
              height={90}
              alt="University"

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