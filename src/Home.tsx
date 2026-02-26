import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <h1>Order Frontend</h1>
      <p>Welcome to the Order Frontend application!</p>
      <p>
        Please <Link to="/login">login</Link> to access your dashboard and
        manage your orders.
      </p>
    </>
  );
}
