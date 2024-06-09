import { useState, useEffect } from "react";

import { Card } from "../../ui/Card";
import { Chip } from "../../ui/Chip";

import { Modal } from "../../ui/Modal";

import { fetchRocket } from "../../api/rocket";

import styles from "./Launches.module.css";

export const Launch = ({
  success,
  details,
  flightNumber,
  name,
  image,
  rocketId,
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Details
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        details={details}
        rocketId={rocketId}
      />
      <Card
        ref={measurementRef}
        onClick={() => setIsModalOpen(true)}
        title={
          name || success !== undefined ? (
            <div title={name} className={styles.title}>
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
              <div>
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "long",
                }).format(new Date(date))}
              </div>
            )}
            {rocketId && <div>{rocketId}</div>}
          </>
        }
      />
    </>
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

const Details = ({
  details,
  rocketId,
  isOpen,
  onClose,
}: {
  details?: string;
  rocketId?: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [rocketDetails, setRocketDetails] = useState<any>();

  useEffect(() => {
    if (isOpen && rocketId) {
      (async () => {
        const data = await fetchRocket({ id: rocketId });
        setRocketDetails(data);
        console.log(data);
      })();
    }
  }, [rocketId, isOpen]);

  return (
    <Modal isOpen={isOpen} title="Details" onClose={onClose}>
      {details}
      {rocketDetails && (
        <div className={styles.rocketDetails}>
          {rocketDetails.active !== undefined && (
            <Chip color={rocketDetails.active ? "success" : "error"}>
              {rocketDetails.active ? "Active" : "Inactive"}
            </Chip>
          )}
          <span>Name: {rocketDetails.name}</span>
          <span>Stages: {rocketDetails.stages}</span>
          <span>Boosters: {rocketDetails.boosters}</span>
          <span>Cost per launch: {rocketDetails.cost_per_launch}</span>
          <span>First flight: {rocketDetails.first_flight}</span>
          <span>company: {rocketDetails.company}</span>
          <span>Country: {rocketDetails.country}</span>
          <span>Description: {rocketDetails.description}</span>
          <span>Height: {rocketDetails.height.meters} m</span>
          <span>Diameter: {rocketDetails.diameter.meters} m</span>
          <span>Mass: {rocketDetails.mass.kg} kg</span>
          <span>Number of engines: {rocketDetails.engines.number}</span>
          <span>Type of engines: {rocketDetails.engines.type}</span>
        </div>
      )}
    </Modal>
  );
};
