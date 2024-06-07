import { Main } from "../../pages/main";

import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>SpaceX</header>
      <main className={styles.main}>
        <Main />
      </main>
    </div>
  );
}
