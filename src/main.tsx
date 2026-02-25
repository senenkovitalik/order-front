import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./Home.tsx";
import AuthLayout from "./AuthLAyout.tsx";
import Login from "./Login/Login.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import { AuthProvider } from "./AuthContext.tsx";
import { HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<App />} />

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="private" element={<h1>Private Route</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>,
);
