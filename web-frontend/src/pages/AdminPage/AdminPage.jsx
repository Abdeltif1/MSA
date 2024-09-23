import React, { useState } from "react";
import Sidebar from "../../components/Menu/Sidebar";

import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Container = styled.div`
  display: flex;
  height: 100vh; /* Ensure the container takes the full height of the viewport */
`;

const SidebarStyled = styled(Sidebar)`
  flex: 0 0 250px; /* Fixed width for the sidebar */
  background-color: #f4f4f4; /* Optional: background color for the sidebar */
  padding: 20px; /* Optional: padding for the sidebar */
`;



const ContentArea = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px; /* Optional: padding for the content area */
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, loading] = useAuthState(auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.setPersistence(browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      setError("authentication failed");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <LoginContainer>
        <LoginForm onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </LoginForm>
      </LoginContainer>
    );
  }

  return (
    <Container>
      <SidebarStyled />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Container>
  );
};
