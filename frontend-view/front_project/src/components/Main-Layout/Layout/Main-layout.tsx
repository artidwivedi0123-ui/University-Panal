"use client";

import Sidebar from "@/src/components/Main-Layout/SideBar/SideBar";
import style from "./main.layout.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UseAuthState } from "../../AuthForm/useAuthState";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {logout} = UseAuthState();

 

  return (
    <div className={style["layout-container"]}>

      <Sidebar />

      <div className={style["main-content"]}>
          
        <button  onClick={logout}
        className={style["btn"]}>Logout</button>
        {children}
        
      </div>

    </div>
  );
}