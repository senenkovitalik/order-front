import { useState } from "react";
import {
  Button,
  Modal,
  Table,
  TableRow,
  TableTd,
  TableTh,
} from "../components/components";
import type {
  CreateDeviceMutation,
  CreateDeviceMutationVariables,
  DeleteDeviceMutation,
  DeleteDeviceMutationVariables,
  Device,
  DevicesQuery,
  DevicesQueryVariables,
  UpdateDeviceMutation,
  UpdateDeviceMutationVariables,
} from "../types/__generated__/graphql";
import {
  CREATE_DEVICE_MUTATION,
  DELETE_DEVICE_MUTATION,
  DEVICES_QUERY,
  UPDATE_DEVICE_MUTATION,
} from "./queries";
import { useMutation, useQuery } from "@apollo/client/react";
import type { DeviceInputs, ModalState } from "./types";
import CreateDeviceForm from "./CreateDeviceForm";
import UpdateDeviceForm from "./UpdateDeviceForm";
import DeleteDeviceForm from "./DeleteDeviceForm";

export default function Devices() {
  const [modal, setModal] = useState<ModalState>(null);

  const { loading, error, data } = useQuery<
    DevicesQuery,
    DevicesQueryVariables
  >(DEVICES_QUERY);

  const [createDevice, { reset: resetCreateError, error: createDeviceError }] =
    useMutation<CreateDeviceMutation, CreateDeviceMutationVariables>(
      CREATE_DEVICE_MUTATION,
    );

  const [updateDevice, { reset: resetUpdateError, error: updateDeviceError }] =
    useMutation<UpdateDeviceMutation, UpdateDeviceMutationVariables>(
      UPDATE_DEVICE_MUTATION,
    );

  const [
    deleteDevice,
    { reset: resetDeleteError, error: deleteEmployeeError },
  ] = useMutation<DeleteDeviceMutation, DeleteDeviceMutationVariables>(
    DELETE_DEVICE_MUTATION,
  );

  const handleCreateSubmit = async (form: DeviceInputs) => {
    try {
      await createDevice({
        variables: {
          devicePayload: {
            ...form,
          },
        },
        refetchQueries: [{ query: DEVICES_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error creating device:", err);
    }
  };

  const handleUpdateSubmit = async (form: DeviceInputs) => {
    try {
      await updateDevice({
        variables: {
          devicePayload: {
            id: modal?.type === "update" ? modal.deviceId : "",
            ...form,
          },
        },
        refetchQueries: [{ query: DEVICES_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error updating device:", err);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      await deleteDevice({
        variables: {
          deleteDeviceId: modal?.type === "delete" ? modal.deviceId : "",
        },
        refetchQueries: [{ query: DEVICES_QUERY }],
      });

      setModal(null);
    } catch (err) {
      console.error("Error deleting device:", err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching Devices:", error);
  }

  return (
    <div>
      <Table>
        <thead>
          <TableRow>
            <TableTh>#</TableTh>
            <TableTh>Manufacturer</TableTh>
            <TableTh>Model</TableTh>
            <TableTh>OS</TableTh>
            <TableTh>Serial Number</TableTh>
            <TableTh>Employee</TableTh>
            <TableTh>VPN Profile</TableTh>
            <TableTh>Actions</TableTh>
          </TableRow>
        </thead>
        <tbody>
          {data?.devices.map((device, index) => (
            <TableRow key={device.id}>
              <TableTd>{index + 1}</TableTd>
              <TableTd>{device.manufacturer}</TableTd>
              <TableTd>{device.model}</TableTd>
              <TableTd>{device.os}</TableTd>
              <TableTd>{device.serialNumber}</TableTd>
              <TableTd>
                {device.employee?.fullname}
                <br />
                {device.employee?.contactInfo}
                <br />
                {device.employee?.unit?.title}
              </TableTd>
              <TableTd>{device.vpnProfile?.profileCode}</TableTd>
              <TableTd>
                <Button
                  onClick={() =>
                    setModal({ type: "update", deviceId: device.id })
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() =>
                    setModal({ type: "delete", deviceId: device.id })
                  }
                >
                  Delete
                </Button>
              </TableTd>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-end mt-4 p-4">
        <Button onClick={() => setModal({ type: "create" })}>
          + Add Device
        </Button>
      </div>

      {modal !== null && (
        <Modal>
          {modal?.type === "create" && (
            <CreateDeviceForm
              onCancel={() => {
                setModal(null);
                resetCreateError();
              }}
              onCreate={handleCreateSubmit}
              error={createDeviceError}
            />
          )}

          {modal?.type === "update" && (
            <UpdateDeviceForm
              data={
                data?.devices.find((d) => d.id === modal.deviceId) as Device
              }
              onCancel={() => {
                setModal(null);
                resetUpdateError();
              }}
              onUpdate={handleUpdateSubmit}
              error={updateDeviceError}
            />
          )}

          {modal?.type === "delete" && (
            <DeleteDeviceForm
              data={
                data?.devices.find((d) => d.id === modal.deviceId) as Device
              }
              onCancel={() => {
                setModal(null);
                resetDeleteError();
              }}
              onDelete={handleDeleteSubmit}
              error={deleteEmployeeError}
            />
          )}
        </Modal>
      )}
    </div>
  );
}
