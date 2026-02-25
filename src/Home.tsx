import { Link } from "react-router"

function Home() {
  return (
    <>
      <h1>Order Frontend</h1>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/vpn_profiles">VPN Profiles</Link>
      <br />
      <Link to="/units">Units</Link>
    </>
  )
}

export default Home
