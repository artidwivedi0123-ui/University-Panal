"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import style from "@/src/app/home/home.module.scss";
import { fessLogo, RegisterLogo, UniversityIcon, UniversityLogo } from "@/src/assets";

export default function HomePage() {
  const router = useRouter();

  return (
  <div className={style["home-container"]}>
    <h2>Welcome to the  Campus Study Connect University</h2>

     <Image
        src={UniversityIcon}
        width={180}
        height={180}
        alt="University"
      />
      <div className={style["head-cont"]}>
      <h4 className={style["heading"]}>Explore Our Programs</h4>
<ul>
  <li><strong>10+</strong> Undergraduate & Postgraduate Courses</li>
  <li><strong>50+</strong> Industry-Level Professional Subjects</li>
  <li><strong>10,000+</strong> Students Enrolled Hierarchically</li>
</ul>
</div>

  <div className={style["home-container__cards"]}>

    <div className={style["home-container__card"]}>
      <Image
        src={RegisterLogo}
        width={180}
        height={180}
        alt="Registration"
      />

      <h2 className={style["home-container__title"]}>
       Join the Campus Study Connect
      </h2>

      <button
        className={style["home-container__btn"]}
        onClick={() => router.push("/register")}
      >
 Register and Join Us!!
      </button>
    </div>
    
    <div className={style["home-container__card"]}>
      <Image
        src={UniversityLogo}
        width={180}
        height={180}
        alt="University"
      />

      <h2 className={style["home-container__title"]}>
        See complete Panal of Campus Study  Connet 
      </h2>

      <button
        className={style["home-container__btn"]}
        onClick={() => router.push("/university-dashboard")}
      >
        Explore !!
      </button>
    </div> 

     <div className={style["home-container__card"]}>
      <Image
        src={fessLogo}
        width={180}
        height={180}
        alt="University"
      />

      <h2 className={style["home-container__title"]}>
        Fees Structure of Several Courses
      </h2>

      <button
        className={style["home-container__btn"]}
        onClick={() => router.push("/university-dashboard")}
      >
      Buy Course Online or Offline
      </button>
    </div> 

  </div>
</div>
  );
}