import { useEffect, useState } from "react";
import { IFeeStructureData } from "../modules/fees/fees-struct/modal/IFees";
import { FeesApiProvider } from "../modules/fees/fees-struct/provider/fees.provider";

export const useFeesStructList= () => {
  const [fees, setFees] = useState<IFeeStructureData[]>([]);

  useEffect(() => {
    FeesApiProvider.apolloInstance.getAllFees(
      (res) => {
        setFees(res.data);
      },
      console.error
    );
  }, []);

  return { fees };
};