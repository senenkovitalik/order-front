import { useState } from "react";
import { Container, Button } from "../components/components";
import type { Unit } from "../types/__generated__/graphql";
import type { UnitT } from "./types";

export default function UpdateUnitForm({
  data,
  onCancel,
  onUpdate,
  error,
}: {
  data: Unit;
  onCancel: () => void;
  onUpdate: (form: UnitT) => void;
  error: any;
}) {
  const [form, setForm] = useState({
    title: data.title,
    location: data.location,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit}
    >
      <Container>
        <label htmlFor="title">
          <b>Unit Title</b>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter Unit title"
          name="title"
          value={form.title}
          required
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          onChange={handleInputChange}
        />

        <label htmlFor="location">
          <b>Location</b>
        </label>
        <input
          id="location"
          type="text"
          placeholder="Enter Location"
          name="location"
          value={form.location || ""}
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
