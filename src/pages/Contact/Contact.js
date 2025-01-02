import React, { useEffect, useState } from 'react';
import './Contact.css';
import { useLocation } from 'react-router-dom';

export const Contact = () => {
  const [data, setData] = useState({
    functionName: '',
    date: '',
    department: '', // Add department field
    images: []
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const images = queryParams.get('images') ? queryParams.get('images').split(',') : [];
    setData({
      functionName: queryParams.get('functionName') || '',
      date: queryParams.get('date') || '',
      department: queryParams.get('department') || '', // Set the department value
      images: images || []
    });

    

  }, [location]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='contact'>
      {/* Header Section */}
      <div className="header">
        <h1>Arul Anandar College</h1>
        <h2>Geo Tag Photo Project</h2>
      </div>

      <div className="titleContent">
        <span className='date'>Date:<p>{data.date}</p></span>
        <span className='functionName'>{data.functionName}</span>
        <span className='department'>Department:<p>{data.department}</p></span> {/* Display department */}
        {/* <div className='heading-details'>
        </div> */}
      </div>

      {/* Image Section */}
      <div className="ImageContainer">
        <div className='imageContent'>
          {data.images.length > 0 ? (
            data.images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} style={{ width: 100, height: 100, marginRight: 10 }} />
            ))
          ) : (
            <p>No images uploaded.</p>
          )}
        </div>

        <div className='print'>
        <button className='upload' onClick={handlePrint}>PRINT</button>
      </div>
      </div>
    </div>
  );
};
