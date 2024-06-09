import { useState, useEffect } from "react";

import { Card } from "../../ui/Card";
import { Chip } from "../../ui/Chip";

import { Modal } from "../../ui/Modal";

import { fetchRocket, type Rocket } from "../../api/rocket";

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
  const [isLoading, setIsLoading] = useState(false);
  const [rocketDetails, setRocketDetails] = useState<Rocket>();

  useEffect(() => {
    if (isOpen && rocketId) {
      setIsLoading(true);
      (async () => {
        const data = await fetchRocket({ id: rocketId });
        setRocketDetails(data);
        setIsLoading(false);
      })();
    }
  }, [rocketId, isOpen]);

  if (!details && !rocketDetails) return null;

  return (
    <Modal isOpen={isOpen} title="Details" onClose={onClose}>
      {details}
      {isLoading && <div>Loading</div>}
      {rocketDetails && (
        <div className={styles.rocketDetails}>
          {rocketDetails.active !== undefined && (
            <Chip color={rocketDetails.active ? "success" : "error"}>
              {rocketDetails.active ? "Active" : "Inactive"}
            </Chip>
          )}
          {rocketDetails.name && <span>Name: {rocketDetails.name}</span>}
          {rocketDetails.stages !== undefined && (
            <span>Stages: {rocketDetails.stages}</span>
          )}
          {rocketDetails.boosters !== undefined && (
            <span>Boosters: {rocketDetails.boosters}</span>
          )}
          {rocketDetails.cost_per_launch !== undefined && (
            <span>Cost per launch: {rocketDetails.cost_per_launch}</span>
          )}
          {rocketDetails.first_flight && (
            <span>First flight: {rocketDetails.first_flight}</span>
          )}
          {rocketDetails.company && (
            <span>company: {rocketDetails.company}</span>
          )}
          {rocketDetails.country && (
            <span>Country: {rocketDetails.country}</span>
          )}
          {rocketDetails.description && (
            <span>Description: {rocketDetails.description}</span>
          )}
          {rocketDetails.height.meters !== undefined && (
            <span>Height: {rocketDetails.height.meters}m</span>
          )}
          {rocketDetails.diameter.meters !== undefined && (
            <span>Diameter: {rocketDetails.diameter.meters}m</span>
          )}
          {rocketDetails.mass.kg !== undefined && (
            <span>Mass: {rocketDetails.mass.kg}kg</span>
          )}
          {rocketDetails.engines.number !== undefined && (
            <span>Number of engines: {rocketDetails.engines.number}</span>
          )}
          {rocketDetails.engines.type && (
            <span>Type of engines: {rocketDetails.engines.type}</span>
          )}
        </div>
      )}
    </Modal>
  );
};
