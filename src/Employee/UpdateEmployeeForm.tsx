import { Container, Button } from "../components/components";
import { UNITS_FOR_EMPLOYEES } from "./queries";
import { useQuery } from "@apollo/client/react";
import type {
  Employee,
  UnitsForEmployeesQuery,
  UnitsForEmployeesQueryVariables,
} from "../types/__generated__/graphql";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  unitId: string;
  fullname: string;
  contactInfo: string;
};

export default function UpdateEmployeeForm({
  data,
  onCancel,
  onUpdate,
  error,
}: {
  data: Employee;
  onCancel: () => void;
  onUpdate: (data: Inputs) => void;
  error: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (form) => onUpdate(form);

  const {
    loading,
    error: unitsError,
    data: unitsData,
  } = useQuery<UnitsForEmployeesQuery, UnitsForEmployeesQueryVariables>(
    UNITS_FOR_EMPLOYEES,
  );

  const options = unitsData?.units ?? [];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (unitsError) {
    console.error("Error fetching Units:", unitsError);
  }

console.log(data);

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <label htmlFor="uname">
          <b>Unit</b>
        </label>
        <select
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          defaultValue={data.unit?.id}
          {...register("unitId", { required: true })}
          disabled={loading}
        >
          {options.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.title}
            </option>
          ))}
        </select>

        <label htmlFor="uname">
          <b>Fullname</b>
        </label>
        <input
          type="text"
          placeholder="Enter Fullname"
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          defaultValue={data.fullname}
          {...register("fullname", { required: true })}
        />
        {errors.fullname && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

        <label htmlFor="contactInfo">
          <b>Contact Info</b>
        </label>
        <input
          type="text"
          placeholder="Enter Contact Info"
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          defaultValue={data.contactInfo || ""}
          {...register("contactInfo", { required: true })}
        />
        {errors.contactInfo && (
          <span className="block text-red-500 -mt-2.5 mb-0.5">
            This field is required
          </span>
        )}

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
