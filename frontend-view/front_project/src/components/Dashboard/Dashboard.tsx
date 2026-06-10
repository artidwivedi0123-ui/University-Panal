import Image from "next/image";
import style from "@/src/components/Dashboard/dashboard.module.scss";
type DashboardType = {
  title?: string;
  description?: string;
  image?: any;
  count?: number | number;
  subjects?: string[];
  students?: string[];
  fees?: string[];
};

type DashboardView = {
  title?: string;
  description?: string;
  cards?: DashboardType[];
};

export default function Dashboard({
  title,
  description,
  cards,
}: DashboardView) {
  return (
    <div className={style["main-container"]}>
      <h2 className={style["title"]}>{title}</h2>
      <div className={style["card-container"]}>
        {cards?.map((card, index) => (
          <div key={index} className={style["cards"]}>
            <Image
              src={card.image}
              width={60}
              height={60}
              alt={card.title ?? ""}
            />

            <h3>{card.title}</h3>
            <p className={style["counting"]}>{card.count}</p>

            <p>{card.description}</p>
            {card.subjects && (
              <div className={style.subjectList}>
                <h4>Subjects</h4>
                {card.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </div>
            )}

            {card.students && (
              <div className={style.subjectList}>
                <h4>Students</h4>
                {card.students.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </div>
            )}

            {card.fees && (
              <div className={style.subjectList}>
                <h4>Fees</h4>
                {card.fees.map((student, index) => (
                  <li key={index}>{student}</li>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
