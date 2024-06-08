import type { ReactNode } from "react";

import { clsx } from "clsx";

import styles from "./Chip.module.css";

export const Chip = ({
  color,
  children,
}: {
  color: "success" | "warning";
  children: ReactNode;
}) => {
  switch (color) {
    case "success":
      return (
        <span className={clsx(styles.status, styles.success)}>{children}</span>
      );

    case "warning":
      return (
        <span className={clsx(styles.status, styles.warning)}>{children}</span>
      );
  }
};
