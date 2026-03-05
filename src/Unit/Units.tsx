import { useMutation, useQuery } from "@apollo/client/react";
import type {
  CreateUnitMutation,
  CreateUnitMutationVariables,
  DeleteUnitMutation,
  DeleteUnitMutationVariables,
  Unit,
  UnitsQuery,
  UnitsQueryVariables,
  UpdateUnitMutation,
  UpdateUnitMutationVariables,
} from "../types/__generated__/graphql";
import {
  Button,
  Modal,
  Table,
  TableRow,
  TableTd,
  TableTh,
} from "../components/components";
import { useState } from "react";
import CreateUnitForm from "./CreateForm";
import UpdateUnitForm from "./UpdateForm";
import {
  UNITS_QUERY,
  CREATE_UNIT_MUTATION,
  UPDATE_UNIT_MUTATION,
  DELETE_UNIT_MUTATION,
} from "./quries";
import type { ModalState, UnitT } from "./types";
import DeleteUnitForm from "./DeleteUnitForm";

export default function Units() {
  const [modal, setModal] = useState<ModalState>(null);

  const { loading, error, data } = useQuery<UnitsQuery, UnitsQueryVariables>(
    UNITS_QUERY,
  );

  const [createUnit, { reset: resetCreateError, error: createUnitError }] =
    useMutation<CreateUnitMutation, CreateUnitMutationVariables>(
      CREATE_UNIT_MUTATION,
    );

  const [updateUnit, { reset: resetUpdateError, error: updateUnitError }] =
    useMutation<UpdateUnitMutation, UpdateUnitMutationVariables>(
      UPDATE_UNIT_MUTATION,
    );

  const [deleteUnit, { reset: resetDeleteError, error: deleteUnitError }] =
    useMutation<DeleteUnitMutation, DeleteUnitMutationVariables>(
      DELETE_UNIT_MUTATION,
    );

  const handleCreateSubmit = async (form: {
    title: string;
    location: string;
  }) => {
    const { title, location } = form;
    // check input values
    if (!title.trim() || !location.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await createUnit({
        variables: {
          unitPayload: {
            title,
            location,
          },
        },
        refetchQueries: [{ query: UNITS_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error creating unit:", err);
    }
  };

  const handleUpdateSubmit = async (form: UnitT) => {
    const { title, location } = form;
    // check input values
    if (!title.trim()) {
      alert("Please fill in Title field.");
      return;
    }

    try {
      await updateUnit({
        variables: {
          unitPayload: {
            id: modal?.type === "update" ? modal.unitId : "",
            title,
            location,
          },
        },
        refetchQueries: [{ query: UNITS_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error updating unit:", err);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteUnit({
        variables: {
          deleteUnitId: modal?.type === "delete" ? modal.unitId : "",
        },
        refetchQueries: [{ query: UNITS_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error deleting unit:", err);
    }
  };

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
            <TableTh>Actions</TableTh>
          </TableRow>
        </thead>
        <tbody>
          {data?.units.map((unit, index) => (
            <TableRow key={unit.id}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{unit.title}</TableTd>
              <TableTd>{unit.location}</TableTd>
              <td className="flex gap-2">
                <Button
                  onClick={() => setModal({ type: "update", unitId: unit.id })}
                >
                  Edit
                </Button>
                <Button variant="danger"
                  onClick={() => setModal({ type: "delete", unitId: unit.id })}
                >
                  Delete
                </Button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end mt-4 p-4">
        <Button onClick={() => setModal({ type: "create" })}>+ Add Unit</Button>
      </div>

      {modal !== null && (
        <Modal>
          {modal?.type === "create" && (
            <CreateUnitForm
              onCancel={() => {
                setModal(null);
                resetCreateError();
              }}
              onCreate={handleCreateSubmit}
              error={createUnitError}
            />
          )}

          {modal?.type === "update" && (
            <UpdateUnitForm
              data={data?.units.find((u) => u.id === modal.unitId) as Unit}
              onCancel={() => {
                setModal(null);
                resetUpdateError();
              }}
              onUpdate={handleUpdateSubmit}
              error={updateUnitError}
            />
          )}

          {modal?.type === "delete" && (
            <DeleteUnitForm
              data={data?.units.find((u) => u.id === modal.unitId) as UnitT}
              onCancel={() => {
                setModal(null);
                resetDeleteError();
              }}
              onDelete={handleDeleteSubmit}
              error={deleteUnitError}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
