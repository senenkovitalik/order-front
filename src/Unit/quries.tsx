import { gql } from "@apollo/client";

export const UNITS_QUERY = gql`
  query Units {
    units {
      id
      title
      location
    }
  }
`;

export const CREATE_UNIT_MUTATION = gql`
  mutation CreateUnit($unitPayload: CreateUnitInput!) {
    createUnit(unitPayload: $unitPayload) {
      id
      location
      title
    }
  }
`;

export const UPDATE_UNIT_MUTATION = gql`
  mutation UpdateUnit($unitPayload: UpdateUnitInput!) {
    updateUnit(unitPayload: $unitPayload) {
      id
      title
      location
    }
  }
`;

export const DELETE_UNIT_MUTATION = gql`
  mutation DeleteUnit($deleteUnitId: ID!) {
    deleteUnit(id: $deleteUnitId) {
      id
      title
      location
    }
  }
`;
