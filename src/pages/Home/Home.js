import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "./Home.css";

export const Home = () => {
  const [functionName, setFunctionName] = useState("");
  const [date, setDate] = useState("");
  const [department, setDepartment] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    URL.revokeObjectURL(images[index].preview); // Clean up memory
    setImages(updatedImages);
  };

  const handleNavigate = (param) => {
    console.log(param)
    navigate("/" + param, {
      state: {
        functionName,
        eventDate: date,
        departmentName: department,
        uploadedImages: images.map((image) => image.file), // Pass image files
      },
    });
  };
  return (
    <div className="main-container">
      <div className="content">
        <header className="HomeHeader">
          <div className="HeaderContent">
            <p>UPLOAD DETAILS</p>
          </div>
        </header>

        <input
          type="text"
          placeholder="Enter Function Name"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}required
        />
       <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)} required>
     
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
      
        <input type="file" multiple onChange={handleFileChange} />
        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <img
                src={image.preview}
                alt={`preview-${index}`}
                className="preview-image"
              />
              <RxCross2
                className="remove-image"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>
        <button className="detail-submit" onClick={() => handleNavigate('layout')}>
          Choose Layout
        </button>
      </div>
    </div>
  );
};

export default Home;
