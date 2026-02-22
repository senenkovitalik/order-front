import { Link } from "react-router"

function Home() {
  return (
    <>
      <h1>Order Frontend</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/private">Private Route</Link>
    </>
  )
}

export default Home
