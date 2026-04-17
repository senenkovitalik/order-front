import { useMutation, useQuery } from "@apollo/client/react";
import type {
  CreateEmployeeMutation,
  CreateEmployeeMutationVariables,
  Employee,
  EmployeesQuery,
  EmployeesQueryVariables,
  UpdateEmployeeMutation,
  UpdateEmployeeMutationVariables,
} from "../types/__generated__/graphql";
import {
  CREATE_EMPLOYEE_MUTATION,
  EMPLOYEES_QUERY,
  UPDATE_EMPLOYEE_MUTATION,
} from "./queries";
import {
  Button,
  Modal,
  Table,
  TableRow,
  TableTd,
  TableTh,
} from "../components/components";
import { useState } from "react";
import CreateEmployeeForm from "./CreateEmployeeForm";
import type { ModalState } from "./types";
import UpdateEmployeeForm from "./UpdateEmployeeForm";

export default function Employees() {
  const [modal, setModal] = useState<ModalState>(null);

  const { loading, error, data } = useQuery<
    EmployeesQuery,
    EmployeesQueryVariables
  >(EMPLOYEES_QUERY);

  const [
    createEmployee,
    { reset: resetCreateError, error: createEmployeeError },
  ] = useMutation<CreateEmployeeMutation, CreateEmployeeMutationVariables>(
    CREATE_EMPLOYEE_MUTATION,
  );

  const [
    updateEmployee,
    { reset: resetUpdateError, error: updateEmployeeError },
  ] = useMutation<UpdateEmployeeMutation, UpdateEmployeeMutationVariables>(
    UPDATE_EMPLOYEE_MUTATION,
  );

  const handleCreateSubmit = async (form: {
    unitId: string;
    fullname: string;
    contactInfo: string;
  }) => {
    const { unitId, fullname, contactInfo } = form;
    // check input values
    if (!fullname.trim() || !contactInfo.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createEmployee({
        variables: {
          employeePayload: {
            // need to fix this later
            // userId,
            unitId,
            fullname,
            contactInfo,
          },
        },
        refetchQueries: [{ query: EMPLOYEES_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error creating employee:", err);
    }
  };

  const handleUpdateSubmit = async (form: {
    unitId: string;
    fullname: string;
    contactInfo: string;
  }) => {
    const { unitId, fullname, contactInfo } = form;
    // check input values
    if (!fullname.trim() || !contactInfo.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await updateEmployee({
        variables: {
          employeePayload: {
            id: modal?.type === "update" ? modal.employeeId : "",
            unitId,
            fullname,
            contactInfo,
          },
        },
        refetchQueries: [{ query: EMPLOYEES_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching Employees:", error);
  }

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            <TableTh>#</TableTh>
            <TableTh>Fullname</TableTh>
            <TableTh>Contact Info</TableTh>
            <TableTh>Unit</TableTh>
            <TableTh>Actions</TableTh>
          </TableRow>
        </thead>
        <tbody>
          {data?.employees.map((employee, index) => (
            <TableRow key={employee.id}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{employee.fullname}</TableTd>
              <TableTd>{employee.contactInfo}</TableTd>
              <TableTd>{employee.unit?.title}</TableTd>
              <td className="flex gap-2">
                <Button
                  onClick={() =>
                    setModal({ type: "update", employeeId: employee.id })
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  //   onClick={() => setModal({ type: "delete", unitId: unit.id })}
                >
                  Delete
                </Button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end mt-4 p-4">
        <Button onClick={() => setModal({ type: "create" })}>
          + Add Employee
        </Button>
      </div>

      {modal !== null && (
        <Modal>
          {modal?.type === "create" && (
            <CreateEmployeeForm
              onCancel={() => {
                setModal(null);
                resetCreateError();
              }}
              onCreate={handleCreateSubmit}
              error={createEmployeeError}
            />
          )}

          {modal?.type === "update" && (
            <UpdateEmployeeForm
              data={
                data?.employees.find(
                  (e) => e.id === modal.employeeId,
                ) as Employee
              }
              onCancel={() => {
                setModal(null);
                resetUpdateError();
              }}
              onUpdate={handleUpdateSubmit}
              error={updateEmployeeError}
            />
          )}

          {/* {modal?.type === "delete" && (
            <DeleteUnitForm
              data={data?.units.find((u) => u.id === modal.unitId) as UnitT}
              onCancel={() => {
                setModal(null);
                resetDeleteError();
              }}
              onDelete={handleDeleteSubmit}
              error={deleteUnitError}
            />
          )}  */}
        </Modal>
      )}
    </div>
  );
}
