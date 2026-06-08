interface InputProps {
    name:string;
    value:string | number;
    placeholder?:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    classname?:string;
    type:string;
};

export default function Input({
    name,
    value,
    placeholder,
    onChange,
    classname,
    type,
}:InputProps){
    return (
        <>
        <input 
        name={name}
        value={value ?? ""}
        placeholder={placeholder}
        type={type}
        className={classname}
        onChange={onChange}
        >
        </input>
        </>
    )
}