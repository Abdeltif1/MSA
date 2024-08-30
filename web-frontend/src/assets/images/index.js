import styled from "styled-components";
import React, { useEffect, useState } from 'react';
const imageContext = require.context( "", false, /\.(png|jpe?g|svg)$/);


const Sun = ({ path }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
      if (path) {
        try {
          // Dynamically require the image
          const imagePath = imageContext(`./${path}`);
          setImageSrc(imagePath);
        } catch (error) {
          console.error("Error loading image:", error);
        }
      } else {
        console.error("Error: imageName is not defined");
      }
  }, [path]);

  if (!imageSrc) {
    return <div>Loading...</div>;
  }

  return <Image src={imageSrc} alt="hihihi" />;
};

export default Sun;


// const Sun = ({path}) => {
//     const imagePath = require(path);
//   return <Image src={imagePath} alt="Logo" />;
// };

const Image = styled.img`
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
  

  @media (max-width: 430px) {
    display: none;
  }
`;

// export default Sun;
