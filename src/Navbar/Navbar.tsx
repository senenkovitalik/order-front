import { StyledLink } from "../components/components";

export default function Navbar() {
  return (
    <nav>
      <ul className="list-none m-0 p-0 flex bg-[#333333]">
        <li>{StyledLink("/login", "Login")}</li>
        <li>{StyledLink("/vpn_profiles", "VPN Profiles")}</li>
        <li>{StyledLink("/units", "Units")}</li>
        <li>{StyledLink("/employees", "Employees")}</li>
        <li>{StyledLink("/devices", "Devices")}</li>
      </ul>
    </nav>
  );
}
