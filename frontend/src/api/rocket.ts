export type Rocket = {
  name?: string;
  active?: boolean;
  stages?: number;
  boosters?: number;
  cost_per_launch?: number;
  first_flight?: string;
  country?: string;
  company?: string;
  height: {
    meters?: number;
    feet?: number;
  };
  diameter: {
    meters?: number;
    feet?: number;
  };
  mass: {
    kg?: number;
    lb?: number;
  };
  engines: {
    number?: number;
    type?: string;
    version?: string;
  };
  description?: string;
};

export const fetchRocket = ({ id }: { id: string }): Promise<Rocket> => {
  return fetch(`http://localhost:3000/api/rocket/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());
};
