import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to install react-router-dom
import { RxCross2 } from "react-icons/rx";
import './Home.css';

export const Home = () => {
  const [functionName, setFunctionName] = useState('');
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState(''); // State for department
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a preview URL
    }));
    setImages((prevImages) => [...prevImages, ...newImages]); // Append new images to existing ones
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);

    // Revoke the URL for the removed image
    URL.revokeObjectURL(images[index].preview);

    setImages(updatedImages);
  };

  const handleNavigate = () => {
    const imageFiles = images.map((image) => image.file);
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));
    const imageParams = imageUrls.join(','); // Join image URLs with a comma for query string
    navigate(`/contact?functionName=${functionName}&date=${date}&department=${department}&images=${imageParams}`);
  };

  return (
    <div className='main-container'>
    <div className='content'>
      <header className='HomeHeader'>
        <div className='HeaderContent'>
          <p>UPLOAD DETAILS</p>
        </div>
      </header>

      <input
        type="text"
        placeholder="Enter Function Name"
        value={functionName}
        onChange={(e) => setFunctionName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)} >
     
        <option value="" disabled>
          Select Department
        </option>
        <option value="Department of History">Department of History</option>
        <option value="Department of Economics">Department of Economics</option>
        <option value="Department of Philosophy">Department of Philosophy</option>
        <option value="Department of Mathematics">Department of Mathematics</option>
        <option value="Department of Physics">Department of Physics</option>
        <option value="Department of Chemistry">Department of Chemistry</option>
        <option value="Department of Rural Development Science">Department of Rural Development Science</option>
        <option value="Department of Tamil-Aided">Department of Tamil-Aided</option>
        <option value="Department of English-Aided">Department of English-Aided</option>
        <option value="Department of Tamil-SF">Department of Tamil-SF</option>
        <option value="Department of English-SF">Department of English-SF </option>
        <option value="Department of Commerce with Computer Applications">Department of Commerce with Computer Applications</option>
        <option value="Department of Business Administration">Department of Business Administration</option>
        <option value="Department of Information Technology and Management">Department of Information Technology and Management</option>
        <option value="Department of Physical Education">Department of Physical Education</option>
        <option value="Department of Computer Science and Applications">Department of Computer Science and Applications</option>
        <option value="Department of Food Science and Technology">Department of Food Science and Technology </option>
      </select>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.preview}
              alt={`preview-${index}`}
              className="preview-image"
            />
      
              <RxCross2  className="remove-image"
              onClick={() => handleRemoveImage(index)}/>
            
          </div>
        ))}
      </div>
      <button onClick={handleNavigate}>Submit</button>
    </div>
    </div>
  );
};
