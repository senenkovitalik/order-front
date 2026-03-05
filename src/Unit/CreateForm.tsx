import { useState } from "react";
import { Container, Button } from "../components/components";

export default function CreateUnitForm({ onCancel, onCreate, error }: any) {
  const [form, setForm] = useState({
    title: "",
    location: "",
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
    onCreate(form);
  };

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit}
    >
      <Container>
        <label htmlFor="uname">
          <b>Unit Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter Unit title"
          name="title"
          required
          className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
          onChange={handleInputChange}
        />

        <label htmlFor="location">
          <b>Location</b>
        </label>
        <input
          type="text"
          placeholder="Enter Location"
          name="location"
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
