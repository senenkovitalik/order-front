import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthContext";
import { useLazyQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import type {
  LoginQuery,
  LoginQueryVariables,
} from "../types/__generated__/graphql";
import { Container, Button, CancelButton } from "../components/components";

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

  const [getLogin, { error }] = useLazyQuery<LoginQuery, LoginQueryVariables>(
    LOGIN_QUERY,
  );

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
        login(loginRes.data.login.token);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <div className="flex flex-col content-center items-center">
      <form
        onSubmit={handleSubmit}
        className="border-3 border-solid border-[#f1f1f1]"
      >
        <div className="flex justify-center ml-0 mr-0 my-6">
          <img
            src="img_avatar2.png"
            alt="Avatar"
            className="w-2/5 rounded-[50%]"
          />
        </div>

        <Container>
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
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
            className="w-full py-3 px-5 my-2 mx-0 inline-block border border-solid outline-[#ccc] box-border"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </Container>

        <Container style={{ backgroundColor: "#f1f1f1" }}>
          <CancelButton type="button" onClick={() => navigate(-1)}>
            Cancel
          </CancelButton>
        </Container>
      </form>
    </div>
  );
}
