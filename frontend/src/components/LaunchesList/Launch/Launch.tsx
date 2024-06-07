import { useState } from "react";
import { clsx } from "clsx";

import styles from "./Launch.module.css";

export const Launch = ({
  success,
  details,
  flightNumber,
  name,
  image,
  rocketId,
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
  const [showDetails, setShowDetails] = useState(false);
  const [showRocket, setShowRocket] = useState(false);

  return (
    <div className={styles.container}>
      {image?.small || image?.large ? (
        <img className={styles.image} src={image?.small || image?.large} />
      ) : (
        <div className={clsx(styles.image, styles.stub)} />
      )}

      {name && <span className={styles.name}>{name}</span>}

      <div className={styles.description}>
        {date && (
          <span>
            Date:{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
              timeStyle: "long",
            }).format(new Date(date))}
          </span>
        )}
        {flightNumber && <span>Flight Number: {flightNumber}</span>}
        {details &&
          (showDetails ? (
            <span>Details: {details}</span>
          ) : (
            <button onClick={() => setShowDetails(true)}>Details</button>
          ))}
        {rocketId &&
          (showRocket ? (
            <RocketDetails id={rocketId} />
          ) : (
            <button onClick={() => setShowRocket(true)}>Rocket</button>
          ))}
      </div>

      {success !== undefined && <Status value={success ? "success" : "fail"} />}
    </div>
  );
};

const Status = ({ value }: { value: "success" | "fail" }) => {
  const isSuccessful = value === "success";

  return (
    <span
      className={clsx(styles.status, {
        [styles.success]: isSuccessful,
        [styles.fail]: !isSuccessful,
      })}
    >
      {isSuccessful ? "Success" : "Failure"}
    </span>
  );
};

const RocketDetails = ({ id }: { id: string }) => {
  return <>rocket details</>;
};
