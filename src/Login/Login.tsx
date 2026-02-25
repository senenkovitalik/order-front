import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import { useLazyQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type {
  LoginQuery,
  LoginQueryVariables,
} from "../types/__generated__/graphql";
import "./Login.css";

const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [getLogin, { loading, error }] = useLazyQuery<
    LoginQuery,
    LoginQueryVariables
  >(LOGIN_QUERY);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      const loginRes = await getLogin({ variables: { username, password } });

      if (
        loginRes &&
        loginRes.data &&
        loginRes.data.login &&
        loginRes.data.login.token
      ) {
        login();
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="imgcontainer">
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

          <div className="container">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          </div>

          <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
            <button type="button" className="cancelbtn" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
