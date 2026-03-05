import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type {
  VpnProfilesQuery,
  VpnProfilesQueryVariables,
} from "../types/__generated__/graphql";
import { Table, TableRow, TableTd, TableTh } from "../components/components";

const VPN_PROFILES_QUERY = gql`
  query VpnProfiles {
    vpnProfiles {
      id
      ipAddress
      profileCode
      device {
        id
        manufacturer
        model
        os
        serialNumber
        employee {
          id
          unit {
            id
            title
          }
          fullname
        }
      }
    }
  }
`;

export default function VpnProfiles() {
  const { loading, error, data } = useQuery<
    VpnProfilesQuery,
    VpnProfilesQueryVariables
  >(VPN_PROFILES_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching VPN profiles:", error);
  }

  return (
    <div>
      <h1>VPN Profiles</h1>
      <Table>
        <thead>
          <TableRow>
            <TableTh>Profile Code</TableTh>
            <TableTh>IP Address</TableTh>
            <TableTh>Device Manufacturer</TableTh>
            <TableTh>Device Model</TableTh>
            <TableTh>Device Serial Number</TableTh>
            <TableTh>Device OS</TableTh>
            <TableTh>Employee Name</TableTh>
            <TableTh>Employee Unit</TableTh>
          </TableRow>
        </thead>
        <tbody>
          {data?.vpnProfiles.map((profile) => (
            <TableRow key={profile.id}>
              <TableTd>{profile.profileCode}</TableTd>
              <TableTd>{profile.ipAddress}</TableTd>
              <TableTd>{profile.device?.manufacturer || "-"}</TableTd>
              <TableTd>{profile.device?.model || "-"}</TableTd>
              <TableTd>{profile.device?.serialNumber || "-"}</TableTd>
              <TableTd>{profile.device?.os || "-"}</TableTd>
              <TableTd>{profile.device?.employee.fullname || "-"}</TableTd>
              <TableTd>{profile.device?.employee.unit.title || "-"}</TableTd>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
