import React from 'react';
import ContentLoader from "react-content-loader";

const FormContentloader = (props) => {
    return (   
      <ContentLoader 
      speed={2}
      width={1200}
      height={500}
      viewBox="0 0 1500 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="9" rx="0" ry="0" width="169" height="21" /> 
      <rect x="0" y="45" rx="0" ry="0" width="1150" height="21" /> 
      
      <rect x="0" y="81" rx="0" ry="0" width="169" height="21" /> 
      <rect x="0" y="115" rx="0" ry="0" width="1150" height="21" />

      <rect x="0" y="147" rx="0" ry="0" width="169" height="18" /> 
      <rect x="0" y="179" rx="0" ry="0" width="1150" height="21" />

      <rect x="0" y="230" rx="0" ry="0" width="300" height="61" />

     
    </ContentLoader>
    )
}
 
export default FormContentloader;