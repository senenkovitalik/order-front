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

export const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($employeePayload: UpdateEmployeeInput!) {
    updateEmployee(employeePayload: $employeePayload) {
      id
      unit {
        id
        title
      }
      fullname
      contactInfo
    }
  }
`;

export const DELETE_EMPLOYEE_MUTATION = gql`
  mutation DeleteEmployee($deleteEmployeeId: ID!) {
    deleteEmployee(id: $deleteEmployeeId) {
      id
    }
  }
`;
