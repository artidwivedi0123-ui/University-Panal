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
  StudentDashboard,
  StudentFees,
  Students,
  SubDash,
  Subject,
  UniversityLogo,
} from "@/src/assets";
import { FEESROUTES, STUDENTPROFILEROUTES, UNIVERSITYROUTES } from "@/src/constants/routes.contants";
import { useAuth } from "@/src/context/AuthContext";
import { ROLENUM } from "@/src/constants/enum.constants";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";

export default function Sidebar() {
  const { role } = useAuth();
  const router = useRouter();
  const sidebarTrans = useTranslations(TRANSLATIONSAPPCONSTANTS.SIDEBAR);
  const pathname = usePathname();

  const AdminMenus = [
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.ADMINDASHBOARD),
      route: UNIVERSITYROUTES.UNIVERSITYDASHBOARD,
      image: DashboardImg,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.COURSE),
      route: "/course",
      image: CourseManaged,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.AVIALABLECOU),
      route: UNIVERSITYROUTES.COURSES,
      image: Courses,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.AVAILABLESEM),
      route: UNIVERSITYROUTES.SEMESTERS,
      image: Semester,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTS),
      route: UNIVERSITYROUTES.SUBJECTS,
      image: Subject,
    },
    // {
    //   title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.SUBDASH),
    //   route: UNIVERSITYROUTES.SUBJECTDASHBOARD,
    //   image: SubDash,
    // },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTS),
      route: UNIVERSITYROUTES.STUDENTS,
      image: Students,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTDASH),
      route: UNIVERSITYROUTES.STUDENTDASHBOARD,
      image: StuDash,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.FEESSTRCTURE),
      route: FEESROUTES.FEESTRUCTURE,
      image: Fees,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.FEESDASH),
      route: FEESROUTES.FEEDASHBOARD,
      image: FeesDash,
    },
    {
      title:sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENNTFEESDATA),
      route: FEESROUTES.STUDENTFEES,
      image: StudentFees,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTDETAILS),
      route: UNIVERSITYROUTES.STUDENTPROFILEDETAIL,
      image: IdCard,
    },
  ];

  const StudentMenus = [
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STDASHBOARD),
      route:"/dashboard",
      image: StudentDashboard
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTPROFILE),
      route: STUDENTPROFILEROUTES.STUDENTDETAIL,
      image: IdCard,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTRESULT),
      route: STUDENTPROFILEROUTES.STUDENTRESULT,
      image: MIcon,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTSUBJECT),
      route: STUDENTPROFILEROUTES.STUDENTSUBJECT,
      image: Subject,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.STUDENTFEES),
      route: STUDENTPROFILEROUTES.STUDENTFEE,
      image: Fees,
    },

    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.AVIALABLECOU),
      route: UNIVERSITYROUTES.COURSES,
      image: Courses,
    },
    {
      title: sidebarTrans(TRANSLATIONSAPPCONSTANTS.AVAILABLESEM),
      route: UNIVERSITYROUTES.SEMESTERS,
      image: Semester,
    },
  ];

  const menus = role === ROLENUM.ADMIN ? AdminMenus : StudentMenus;
  return (
    <div className={style["sidebar"]}>
      <div className={style["menu-container"]}>
        <Image
          onClick={() => router.push("/")}
          className={style["image"]}
          src={UniversityLogo}
          width={90}
          height={90}
          alt="University"
          loading="eager"
        />
        {menus.map((menu, index) => (
          <div
            key={index}
            className={
              pathname === menu.route ? style["active-menu"] : style["menu"]
            }
            onClick={() => router.push(menu.route)}
          >
            <Image src={menu.image} width={28} height={28} alt="menu-image" />
            <span>{menu.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
