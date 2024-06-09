import { forwardRef, type ReactNode } from "react";
import { clsx } from "clsx";

import { LazyImage } from "../LazyImage";

import styles from "./Card.module.css";

export const Card = forwardRef<
  HTMLDivElement,
  {
    title?: ReactNode;
    content: ReactNode;
    image?: { small?: string; large?: string; alt: string };
    onClick?: () => void;
  }
>(({ title, content, image, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={clsx(styles.container, { [styles.clickable]: onClick })}
      tabIndex={onClick ? 0 : -1}
    >
      {image ? (
        <LazyImage className={styles.image} {...image} />
      ) : (
        <div className={styles.stub} />
      )}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{content}</div>
    </div>
  );
});
