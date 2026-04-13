import { useEffect, useState } from "react";
import { Container, Button } from "../components/components";
import { UNITS_FOR_EMPLOYEES } from "./queries";
import { useQuery } from "@apollo/client/react";
import type {
  UnitsForEmployeesQuery,
  UnitsForEmployeesQueryVariables,
} from "../types/__generated__/graphql";

export default function CreateEmployeeForm({ onCancel, onCreate, error }: any) {
  const [form, setForm] = useState({
    unitId: "",
    fullname: "",
    contactInfo: "",
  });

  const {
    loading,
    error: unitsError,
    data,
  } = useQuery<UnitsForEmployeesQuery, UnitsForEmployeesQueryVariables>(
    UNITS_FOR_EMPLOYEES,
  );

  const options = data?.units ?? [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(form);
  };

  useEffect(() => {
    if (!loading && options.length > 0) {
      const isValid = options.some((opt) => opt.id === form.unitId);

      if (!isValid) {
        setForm((prevForm) => ({
          ...prevForm,
          unitId: options[0].id,
        }));
      }
    }
  }, [loading, options]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (unitsError) {
    console.error("Error fetching Units:", unitsError);
  }

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit}
    >
      <Container>
        <label htmlFor="uname">
          <b>Unit</b>
        </label>
        <select
          name="unitId"
          required
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          value={options.length ? form.unitId : ""}
          onChange={handleSelectChange}
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
          name="fullname"
          required
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          onChange={handleInputChange}
        />

        <label htmlFor="contactInfo">
          <b>Contact Info</b>
        </label>
        <input
          type="text"
          placeholder="Enter Contact Info"
          name="contactInfo"
          required
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          onChange={handleInputChange}
        />

        <Button type="submit">Submit</Button>

        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </Container>

      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <Button variant="danger" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Container>
    </form>
  );
}
