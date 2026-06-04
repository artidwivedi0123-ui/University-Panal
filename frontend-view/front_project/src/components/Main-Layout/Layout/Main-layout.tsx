"use client";

import Sidebar from "@/src/components/Main-Layout/SideBar/SideBar";
import style from "./main.layout.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const router  = useRouter();
 const handleLogout = ()=>{
  toast.success("Logout Successfully");
  router.push("/");
 }

  return (
    <div className={style["layout-container"]}>

      <Sidebar />

      <div className={style["main-content"]}>
          
        <button  onClick={handleLogout}
        className={style["btn"]}>Logout</button>
        
        {children}
        
      </div>

    </div>
  );
}