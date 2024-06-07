import styles from "./Launch.module.css";

export const Launch = ({
  success,
  details,
  flightNumber,
  name,
  image,
}: {
  success?: boolean;
  details?: string;
  flightNumber: number;
  name?: string;
  image?: { small?: string; large?: string };
}) => {
  return (
    <div className={styles.container}>
      {/* {rocket && <span>{rocket}</span>} */}

      {image?.small || image?.large ? (
        <img className={styles.image} src={image?.small || image?.large} />
      ) : (
        <div className={styles.stubImage} />
      )}

      {name && <span>{name}</span>}

      <div className={styles.description}>
        {flightNumber && <span>Flight Number: {flightNumber}</span>}
        {details && <span>Details: {details}</span>}
      </div>

      {success !== undefined && (
        <span
          className={
            success ? styles.statusSuccessful : styles.statusUnsuccessful
          }
        >
          {success ? "Successful" : "Unsuccessful"}
        </span>
      )}
    </div>
  );
};
