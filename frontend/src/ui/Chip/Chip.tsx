import type { ReactNode } from "react";

import { clsx } from "clsx";

import styles from "./Chip.module.css";

export const Chip = ({
  color,
  children,
}: {
  color: "success" | "error" | "warning";
  children: ReactNode;
}) => {
  return (
    <span
      className={clsx(styles.status, {
        [styles.success]: color === "success",
        [styles.error]: color === "error",
        [styles.warning]: color === "warning",
      })}
    >
      {children}
    </span>
  );
};
