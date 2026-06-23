"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "@/src/app/home/home.module.scss";
import {
  fessLogo,
  RegisterLogo,
  UniversityIcon,
  UniversityLogo,
} from "@/src/assets";
import { withPublicAuth } from "@/src/hoc/withPublicHoc";
import { useTranslations } from "next-intl";
import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";

function HomePage() {
  const router = useRouter();
  const homeTrans = useTranslations(TRANSLATIONSAPPCONSTANTS.HOME);

  return (
    <div className={style["home-container"]}>
      <h2>{homeTrans(TRANSLATIONSAPPCONSTANTS.HOMEPAGE)}</h2>

      <Image src={UniversityIcon} width={180} height={180} alt="University" />
      <div className={style["head-cont"]}>
        <h4 className={style["heading"]}>
          {homeTrans(TRANSLATIONSAPPCONSTANTS.EXPLOREMORE)}
        </h4>
        <ul>
          <li>
            <strong>
              {homeTrans(TRANSLATIONSAPPCONSTANTS.COURSEESTIMATE)}
            </strong>
            {homeTrans(TRANSLATIONSAPPCONSTANTS.EXLORECOURSE)}
          </li>
          <li>
            <strong>
              {homeTrans(TRANSLATIONSAPPCONSTANTS.SUBJECTESTIMATE)}
            </strong>
            {homeTrans(TRANSLATIONSAPPCONSTANTS.EXPLORESUBJECTS)}
          </li>
          <li>
            <strong>
              {homeTrans(TRANSLATIONSAPPCONSTANTS.STUDENTESTIMATE)}
            </strong>
            {homeTrans(TRANSLATIONSAPPCONSTANTS.EXPLORESTUDENT)}
          </li>
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
            {homeTrans(TRANSLATIONSAPPCONSTANTS.JOINCAMPUS)}
          </h2>

          <button
            className={style["home-container__btn"]}
            onClick={() => router.push("/register")}
          >
            {homeTrans(TRANSLATIONSAPPCONSTANTS.REGISTERANDJOIN)}
          </button>
        </div>

        <div className={style["home-container__card"]}>
          <Image
            src={UniversityLogo}
            width={180}
            height={180}
            alt="University"
            loading="eager"
            unoptimized
          />

          <h2 className={style["home-container__title"]}>
            {homeTrans(TRANSLATIONSAPPCONSTANTS.EXPLORING)}
          </h2>

          <button
            className={style["home-container__btn"]}
            onClick={() => router.push("/university-dashboard")}
          >
            {homeTrans(TRANSLATIONSAPPCONSTANTS.EXPLORE)}
          </button>
        </div>

        <div className={style["home-container__card"]}>
          <Image src={fessLogo} width={180} height={180} alt="University" />

          <h2 className={style["home-container__title"]}>
            {homeTrans(TRANSLATIONSAPPCONSTANTS.LETCONNECT)}
          </h2>

          <button
            className={style["home-container__btn"]}
            onClick={() => router.push("/login")}
          >
            {homeTrans(TRANSLATIONSAPPCONSTANTS.LOGINANDJOIN)}
          </button>
        </div>
      </div>
    </div>
  );
}
export default withPublicAuth(HomePage);
