import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type {
  VpnProfilesQuery,
  VpnProfilesQueryVariables,
} from "../types/__generated__/graphql";
import "./VpnProfiles.css";

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
  return (
    <div>
      <h1>VPN Profiles</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <table className="simple-table">
        <thead>
          <tr>
            <th>Profile Code</th>
            <th>IP Address</th>
            <th>Device Manufacturer</th>
            <th>Device Model</th>
            <th>Device Serial Number</th>
            <th>Device OS</th>
            <th>Employee Name</th>
            <th>Employee Unit</th>
          </tr>
        </thead>
        <tbody>
          {data?.vpnProfiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.profileCode}</td>
              <td>{profile.ipAddress}</td>
              <td>{profile.device?.manufacturer || "-"}</td>
              <td>{profile.device?.model || "-"}</td>
              <td>{profile.device?.serialNumber || "-"}</td>
              <td>{profile.device?.os || "-"}</td>
              <td>{profile.device?.employee.fullname || "-"}</td>
              <td>{profile.device?.employee.unit.title || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
