import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { useLazyQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type {
  LoginQuery,
  LoginQueryVariables,
} from "./types/__generated__/graphql";

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
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          Login {loading ? "..." : ""}
        </button>
        {error && <p style={{ color: "red" }}>Login failed: {error.message}</p>}
      </form>
    </div>
  );
}
