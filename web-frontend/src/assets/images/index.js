import React from "react";
import logo from "./Sun.png"; // Adjust the path as necessary

import styled from "styled-components";

const Sun = () => {
  return (
    
      <Image src={logo} alt="Logo" />
  
  );
};

const Image = styled.img`
  padding: 15px;
  border-radius: 20px;
  margin: 10px;

  @media (max-width: 430px) {
    display: none;
  }
`;

export default Sun;
