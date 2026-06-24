import { TRANSLATIONSAPPCONSTANTS } from "@/src/constants/translationConstants";
import {
  IStudentProfileData,
  IStudentProfileResponse,
} from "@/src/modules/university/student-profile/modal/IStudentProfile";
import { StudentProfileApiProvider } from "@/src/modules/university/student-profile/provider/student-profile.provider";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UseStudentProfileState = () => {
  const [studentProfile, setStudentProfile] = useState<
    IStudentProfileResponse["data"] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const studentTrans = useTranslations(TRANSLATIONSAPPCONSTANTS.STUDENTSPANEL);

  const fetchStudentProfile = useCallback(() => {
    setLoading(true);
    StudentProfileApiProvider.apolloInstance.getStudentProfile(
      (res) => {
        setStudentProfile(res.data);
        setLoading(false);
      },
      (err) => {
        toast.error(
          err?.response?.data?.message || "Error in fetching Students",
        );
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    fetchStudentProfile();
  }, [fetchStudentProfile]);

  return {
    studentProfile,
    loading,
    studentTrans
  };
};
