import style from "@/src/components/CardContainer/card-container.module.scss";

interface CardProps {
  title: string;
  fields: {
    label: string;
    value: string | number;
  }[];
}

export default function Card({
  title,
  fields,
}: CardProps) {
  return (
    <div className={style.card}>
      <h3>{title}</h3>
    <div className={style.grid}>
         {fields.map((field, index) => (
        <p key={index}>
          <strong>{field.label}:</strong>{" "}
          {field.value}
        </p>
      ))}
    </div>
    </div>
     
  );
}