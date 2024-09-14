import React from "react";
import IqamaImamTable from "../../components/Menu/ImamTable";
import styled from "styled-components";

const IqamaImamTableStyled = styled(IqamaImamTable)`
  flex: 1; /* Take up remaining space */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  padding: 20px; /* Optional: padding for the table */
`;

export default function ImamManagement() {
  return (
    <div>
      <IqamaImamTableStyled />
    </div>
  );
}
