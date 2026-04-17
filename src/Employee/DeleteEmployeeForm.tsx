import { Container, Button } from "../components/components";
import type { Employee } from "../types/__generated__/graphql";

export default function DeleteEmployeeForm({
  data,
  onCancel,
  onDelete,
  error,
}: {
  data: Employee;
  onCancel: () => void;
  onDelete: () => void;
  error: any;
}) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <form
      className="border-3 border-solid border-[#f1f1f1]"
      onSubmit={handleSubmit}
    >
      <Container>
        <p>Are you sure you want to delete employee {data.fullname}?</p>

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
