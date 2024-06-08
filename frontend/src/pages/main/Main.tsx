import { useLaunches } from "../../api/launches";

import { Launches } from "../../components/Launches";

export const Main = () => {
  const { data: launches } = useLaunches();

  return <Launches value={launches} />;
};
