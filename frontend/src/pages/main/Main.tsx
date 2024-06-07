import { useLaunches } from "../../api/launches";

import { LaunchesList } from "../../components/LaunchesList";

export const Main = () => {
  const { data: launches } = useLaunches();

  return <LaunchesList value={launches} />;
};
