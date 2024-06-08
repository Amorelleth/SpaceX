import { ChakraProvider } from "@chakra-ui/react";

import { Main } from "../../pages/main";

import styles from "./App.module.css";

export function App() {
  return (
    <ChakraProvider>
      <div className={styles.layout}>
        <main className={styles.main}>
          <header className={styles.header}>SpaceX</header>
          <Main />
        </main>
      </div>
    </ChakraProvider>
  );
}
