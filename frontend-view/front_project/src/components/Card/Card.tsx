import style from "./card.module.scss";

interface DetailCardProps {
  title: string;
  fields: {
    label: string;
    value: string | number;
  }[];
}

export default function DetailCard({ title, fields }: DetailCardProps) {
  return (
    <div className={style.card}>

      <h2>{title}</h2>

      <div className={style.grid}>
        {fields?.map((field, index) => (
          <div key={index} className={style.item}>
            <strong>{field.label}</strong>
            <span>{field.value || "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
