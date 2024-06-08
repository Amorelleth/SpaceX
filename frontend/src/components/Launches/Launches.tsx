import type { Launch } from "../../api/launches";

import { useObserver } from "../../hooks/useObserver";
import { Card } from "../../ui/Card";
import { Chip } from "../../ui/Chip";

import styles from "./Launches.module.css";

export const Launches = ({
  value,
  hasMore,
  isLoading,
  loadMore,
}: {
  value?: Launch[];
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
}) => {
  const measurementRef = useObserver(() => {
    if (hasMore && !isLoading) {
      loadMore();
    }
  });

  return (
    <ul className={styles.list}>
      {value?.map((item, index) => {
        return (
          <li className={styles.item} key={item.name}>
            <Item
              measurementRef={
                index === value.length - 1 ? measurementRef : undefined
              }
              date={item.date_utc}
              rocketId={item.rocket}
              success={item.success}
              details={item.details}
              flightNumber={item.flight_number}
              name={item.name}
              upcoming={item.upcoming}
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
  upcoming,
  measurementRef,
}: {
  success?: boolean;
  details?: string;
  flightNumber: number;
  name?: string;
  image?: { small?: string; large?: string };
  rocketId?: string;
  date?: string;
  upcoming?: boolean;
  measurementRef?: (node: HTMLElement | null) => void;
}) => {
  return (
    <Card
      ref={measurementRef}
      onClick={() => {}}
      title={
        name || success !== undefined ? (
          <div className={styles.title}>
            {name && <span className={styles.titleText}>{name}</span>}
            <Status success={success} upcoming={upcoming} />
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

const Status = ({
  success,
  upcoming,
}: {
  success?: boolean;
  upcoming?: boolean;
}) => {
  const color = success ? "success" : upcoming ? "warning" : "error";
  const status = success ? "Success" : upcoming ? "Future" : "Failed";

  return <Chip color={color}>{status}</Chip>;
};
