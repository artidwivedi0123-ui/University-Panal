import style from "@/src/components/Modal/modal.module.scss";
interface ModalProps  {
     onConfirm:() =>void;
      onCancel:() =>void;
      title:string;
      message:string;
      confirmText:string;
};

export default function ModalBox({
    onConfirm,
    onCancel,
    title = "Confirmation for Deletion",
    message="Are you really sure",
    confirmText= "Yes",
}:ModalProps){
 return (
    <div className={style["par-container"]}>
        <div className={style["container"]}>
            <div className={style["container__title"]}>
                {title}
            </div>
            <p className={style["container__para"]}>{message}</p>
            <button className={style["container__btn1"]} onClick={onCancel}>Cancel</button>
            <button className={style["container__btn2"]} onClick={onConfirm}>Confirm</button>
        </div>
    </div>
 )
}