import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type {
  UnitsQuery,
  UnitsQueryVariables,
} from "../types/__generated__/graphql";
import { Table, TableRow, TableTd, TableTh } from "../components/components";

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
      <Table>
        <thead>
          <TableRow>
            <TableTh>#</TableTh>
            <TableTh>Title</TableTh>
            <TableTh>Location</TableTh>
          </TableRow>
        </thead>
        <tbody>
          {data?.units.map((unit, index) => (
            <TableRow key={unit.id}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{unit.title}</TableTd>
              <TableTd>{unit.location}</TableTd>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
