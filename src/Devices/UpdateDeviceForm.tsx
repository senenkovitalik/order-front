import { Container, Button } from "../components/components";
import {
  EMPLOYEES_FOR_DEVICE_QUERY,
  VPN_PROFILES_WITHOUT_DEVICE_QUERY,
} from "./queries";
import { useQuery } from "@apollo/client/react";
import type {
  EmployeesForDeviceQuery,
  EmployeesForDeviceQueryVariables,
  VpnProfilesWithoutDevicesQuery,
  VpnProfilesWithoutDevicesQueryVariables,
} from "../types/__generated__/graphql";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { DeviceInputs, UpdateDeviceFormProps } from "./types";

export default function UpdateDeviceForm({
  data,
  onCancel,
  onUpdate,
  error,
}: UpdateDeviceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeviceInputs>();

  const onSubmit: SubmitHandler<DeviceInputs> = (data) => onUpdate(data);

  const {
    loading: employeesLoading,
    error: employeesError,
    data: employeesData,
  } = useQuery<EmployeesForDeviceQuery, EmployeesForDeviceQueryVariables>(
    EMPLOYEES_FOR_DEVICE_QUERY,
    {
      fetchPolicy: "no-cache",
    },
  );

  const {
    loading: vpnProfilesLoading,
    error: vpnProfilesError,
    data: vpnProfilesData,
  } = useQuery<
    VpnProfilesWithoutDevicesQuery,
    VpnProfilesWithoutDevicesQueryVariables
  >(VPN_PROFILES_WITHOUT_DEVICE_QUERY, {
    variables: {
      filter: {
        hasDevice: false,
      },
    },
    fetchPolicy: "no-cache",
  });

  const employees = employeesData?.employees ?? [];
  const vpnProfiles = (vpnProfilesData?.vpnProfiles ?? []).concat(
    data.vpnProfile ? [data.vpnProfile] : [],
  );

  if (employeesLoading || vpnProfilesLoading) {
    return <p>Loading...</p>;
  }

  if (employeesError) {
    console.error("Error fetching Employees:", employeesError);
  }

  if (vpnProfilesError) {
    console.error("Error fetching VPN Profiles:", vpnProfilesError);
  }

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <label htmlFor="manufacturer">
          <b>Manufacturer</b>
        </label>
        <input
          type="text"
          placeholder="Enter Manufacturer"
          defaultValue={data.manufacturer}
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          {...register("manufacturer", { required: true })}
        />
        {errors.manufacturer && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

        <label htmlFor="model">
          <b>Model</b>
        </label>
        <input
          type="text"
          placeholder="Enter Model"
          defaultValue={data.model}
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          {...register("model", { required: true })}
        />
        {errors.model && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

        <label htmlFor="os">
          <b>OS</b>
        </label>
        <input
          type="text"
          placeholder="Enter OS"
          defaultValue={data.os}
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          {...register("os", { required: true })}
        />
        {errors.os && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

        <label htmlFor="serialNumber">
          <b>Serial Number</b>
        </label>
        <input
          type="text"
          placeholder="Enter Serial Number"
          defaultValue={data.serialNumber}
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          {...register("serialNumber", { required: true })}
        />
        {errors.serialNumber && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

        <label htmlFor="employeeId">
          <b>Employee</b>
        </label>
        <select
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          defaultValue={
            employees.find((e) => e.id === data.employee?.id)?.id || ""
          }
          {...register("employeeId", { required: true })}
          disabled={employeesLoading}
        >
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.fullname} ({employee.unit?.title})
            </option>
          ))}
        </select>

        <label htmlFor="vpnProfileId">
          <b>VPN Profile</b>
        </label>
        <select
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          defaultValue={
            vpnProfiles.find((vp) => vp.id === data.vpnProfile?.id)?.id || ""
          }
          {...register("vpnProfileId")}
          disabled={vpnProfilesLoading}
        >
          <option key={0} value="">
            None
          </option>
          {vpnProfiles.map((vpnProfile) => (
            <option key={vpnProfile.id} value={vpnProfile.id}>
              {vpnProfile.profileCode}
            </option>
          ))}
        </select>

        <Button type="submit">Submit</Button>

        {error && (
          <p className=" text-red-500 -mt-2.5 mb-0.5">Error: {error.message}</p>
        )}
      </Container>

      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Button variant="danger" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Container>
    </form>
  );
}
