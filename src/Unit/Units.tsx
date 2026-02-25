import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type {
  UnitsQuery,
  UnitsQueryVariables,
} from "../types/__generated__/graphql";

const UNITS_QUERY = gql`
  query Units {
    units {
      id
      title
      location
    }
  }
`;

export default function Units() {
  const { loading, error, data } = useQuery<UnitsQuery, UnitsQueryVariables>(
    UNITS_QUERY,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching Units:", error);
  }

  return (
    <div>
      <h1>Units</h1>
      <table className="simple-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data?.units.map((unit, index) => (
            <tr key={unit.id}>
              <td>{index + 1}</td>
              <td>{unit.title}</td>
              <td>{unit.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
