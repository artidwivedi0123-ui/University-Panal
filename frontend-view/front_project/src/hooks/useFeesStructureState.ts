import { useEffect, useState } from "react";
import { IFeeStructureData } from "../modules/fees/fees-struct/modal/IFees";
import { FeesApiProvider } from "../modules/fees/fees-struct/provider/fees.provider";
import { toast } from "react-toastify";

export const useFeesStructList = () => {
  const [fees, setFees] = useState<IFeeStructureData[]>([]);
  useEffect(() => {
    FeesApiProvider.apolloInstance.getAllFees(
      (res) => {
        setFees(res.data);
      },
      (err) => {
        toast.error(
          err?.response?.data?.message || "Error while fetching Fees Details ",
        );
      },
    );
  }, []);

  return { fees };
};
