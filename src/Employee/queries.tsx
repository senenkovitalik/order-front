import { gql } from "@apollo/client";

export const EMPLOYEES_QUERY = gql`
  query Employees {
    employees {
      id
      fullname
      contactInfo
      unit {
        id
        title
      }
    }
  }
`;

export const UNITS_FOR_EMPLOYEES = gql`
  query UnitsForEmployees {
    units {
      id
      title
    }
  }
`;

export const CREATE_EMPLOYEE_MUTATION = gql`
  mutation CreateEmployee($employeePayload: CreateEmployeeInput!) {
    createEmployee(employeePayload: $employeePayload) {
      contactInfo
      fullname
      id
      unit {
        id
        title
      }
    }
  }
`;
