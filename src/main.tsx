import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./Home.tsx";
import Login from "./Login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { AuthProvider } from "./AuthContext.tsx";
import { HttpLink } from "@apollo/client";
import VpnProfiles from "./VpnProfiles/VpnProfiles.tsx";
import Units from "./Unit/Units.tsx";
import { SetContextLink } from "@apollo/client/link/context";
import Navbar from "./Navbar/Navbar.tsx";

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });

const authLink = new SetContextLink(({ headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<App />} />

            <Route path="login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="vpn_profiles" element={<VpnProfiles />} />
              <Route path="units" element={<Units />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
