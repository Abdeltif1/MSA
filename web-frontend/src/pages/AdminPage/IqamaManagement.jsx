import React from "react";
import IqamaTable from "../../components/Menu/IqamaTable";
import styled from "styled-components";

const IqamaTableStyled = styled(IqamaTable)`
  flex: 1; /* Take up remaining space */
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
  padding: 20px; /* Optional: padding for the table */
`;

export default function IqamaManagement() {
  return (
    <div>
      <IqamaTableStyled />
    </div>
  );
}
