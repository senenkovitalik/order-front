import { gql } from "@apollo/client";

export const DEVICES_QUERY = gql`
  query Devices {
    devices {
      id
      manufacturer
      model
      os
      serialNumber
      employee {
        id
        fullname
        unit {
          id
          title
        }
        contactInfo
      }
      vpnProfile {
        id
        profileCode
      }
    }
  }
`;

export const EMPLOYEES_FOR_DEVICE_QUERY = gql`
  query EmployeesForDevice {
    employees {
      id
      fullname
      unit {
        id
        title
      }
    }
  }
`;

export const VPN_PROFILES_WITHOUT_DEVICE_QUERY = gql`
  query VpnProfilesWithoutDevices($filter: VpnProfileFilter) {
    vpnProfiles(filter: $filter) {
      id
      profileCode
      device {
        id
      }
    }
  }
`;

export const CREATE_DEVICE_MUTATION = gql`
  mutation CreateDevice($devicePayload: CreateDeviceInput!) {
    createDevice(devicePayload: $devicePayload) {
      id
      manufacturer
      model
      os
      serialNumber
      employee {
        id
        fullname
        unit {
          id
          title
        }
        contactInfo
      }
      vpnProfile {
        id
        profileCode
      }
    }
  }
`;

export const UPDATE_DEVICE_MUTATION = gql`
  mutation UpdateDevice($devicePayload: UpdateDeviceInput!) {
    updateDevice(devicePayload: $devicePayload) {
      id
      manufacturer
      model
      os
      serialNumber
      employee {
        id
        fullname
        unit {
          id
          title
        }
        contactInfo
      }
      vpnProfile {
        id
        profileCode
      }
    }
  }
`;

export const DELETE_DEVICE_MUTATION = gql`
  mutation DeleteDevice($deleteDeviceId: ID!) {
    deleteDevice(id: $deleteDeviceId) {
      id
    }
  }
`;
