import Sidebar from "../../components/Menu/Sidebar";
import IqamaImamTable from "../../components/Menu/ImamTable";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh; /* Ensure the container takes the full height of the viewport */
`;

const SidebarStyled = styled(Sidebar)`
  flex: 0 0 250px; /* Fixed width for the sidebar */
  background-color: #f4f4f4; /* Optional: background color for the sidebar */
  padding: 20px; /* Optional: padding for the sidebar */
`;

const IqamaImamTableStyled = styled(IqamaImamTable)`
  flex: 1; /* Take up remaining space */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  padding: 20px; /* Optional: padding for the table */
`;

const ContentArea = styled.div`
  flex: 1; /* Take up remaining space */
  padding: 20px; /* Optional: padding for the content area */
`;

export const AdminPage = () => {
  return (
    <Container>
      <SidebarStyled />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </Container>
  );
};
