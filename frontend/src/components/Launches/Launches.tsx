import type { Launch } from "../../api/launches";

import { Card } from "../../ui/Card";
import { Chip } from "../../ui/Chip";

import styles from "./Launches.module.css";

export const Launches = ({ value }: { value?: Launch[] }) => {
  return (
    <ul className={styles.list}>
      {value?.map((item) => {
        return (
          <li className={styles.item}>
            <Item
              key={item.name}
              date={item.date_utc}
              rocketId={item.rocket}
              success={item.success}
              details={item.details}
              flightNumber={item.flight_number}
              name={item.name}
              image={item?.links?.patch}
            />
          </li>
        );
      })}
    </ul>
  );
};

const Item = ({
  success,
  // details,
  flightNumber,
  name,
  image,
  // rocketId,
  date,
}: {
  success?: boolean;
  details?: string;
  flightNumber: number;
  name?: string;
  image?: { small?: string; large?: string };
  rocketId?: string;
  date?: string;
}) => {
  return (
    <Card
      onClick={() => {}}
      title={
        name || success !== undefined ? (
          <div className={styles.title}>
            {name && <span className={styles.titleText}>{name}</span>}
            {success !== undefined && (
              <Chip color={success ? "success" : "warning"}>
                {success ? "Success" : "Fail"}
              </Chip>
            )}
          </div>
        ) : undefined
      }
      image={
        image?.small || image?.large
          ? { ...image, alt: name ?? flightNumber.toString() }
          : undefined
      }
      content={
        <>
          {date && (
            <span>
              {new Intl.DateTimeFormat("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "long",
              }).format(new Date(date))}
            </span>
          )}
        </>
      }
    />
  );
};
