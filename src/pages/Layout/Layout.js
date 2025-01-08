import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Layout.css'

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);


  const backtohome=()=>{
    navigate('/');
  }
  const {
    functionName = "",
    eventDate = "",
    departmentName = "",
    uploadedImages = [],
  } = location.state || {}; // Retrieve data from state

  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState('');

  // This function handles layout change and navigates accordingly
  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout); // Save the selected layout name to state
    console.log(`Selected layout: ${layout}`); // Log the selected layout
    handleNavigate(layout); // Pass the selected layout type as the layout argument
  };

  // This function handles the navigation and passes the layout type to the next page
  const handleNavigate = (layout) => {
    navigate("/contact", {
      state: {
        functionName: functionName,
        eventDate: eventDate,
        departmentName: departmentName,
        LayoutType: layout, // Use the selected layout here
        uploadedImages: uploadedImages,
      },
    });
  };

  return (
    <div className="layoutContainer">
      <button onClick={() => handleLayoutChange('DefaultLayout')}>
        Default Layout
      </button>
      <button onClick={() => handleLayoutChange('FlexLayout')}>
        Flex Layout
      </button>

      <button onClick={() => handleLayoutChange('RoundLayout')}>
        round Layout
      </button>
      
      <div className="btm-button">
      <button  onClick={backtohome}>homepage</button>
      </div>
    </div>
    
  );
}

export default Layout;
