import type { Device } from "../types/__generated__/graphql";

export type ModalState =
  | { type: "create" }
  | { type: "read"; deviceId: string }
  | { type: "update"; deviceId: string }
  | { type: "delete"; deviceId: string }
  | null;

export type DeviceInputs = {
  manufacturer: string;
  model: string;
  os: string;
  serialNumber: string;
  employeeId: string;
  vpnProfileId: string;
};

export type UpdateDeviceFormProps = {
  data: Device;
  onCancel: () => void;
  onUpdate: (data: DeviceInputs) => void;
  error: any;
};

export type CreateDeviceFormProps = {
  onCancel: () => void;
  onCreate: (data: DeviceInputs) => void;
  error: any;
};