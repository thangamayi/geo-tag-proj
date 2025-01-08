import React, { useEffect, useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { set } from 'mongoose';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [allImage,setALLImage]=useState([]);

  useEffect(()=>{
    getPdf();
  },[]);
  const getPdf=async()=>{
    const result=await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setALLImage(result.data.data);
    
  };

  const submitImage = async (e) => {
    e.preventDefault();
    
    // Prepare FormData to send to the server
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    console.log('Title:', title, 'File:', file);

    try {
      // Send POST request with the form data
      const result = await axios.post('http://localhost:5000/upload-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(result);

      // Display success alert
      if(result.data.status =="ok"){
        alert('File uploaded successfully!');
        getPdf();
      }
      
    } catch (error) {
      console.error('Error during file upload:', error);
      window.alert('There was an error uploading the file.');
    }
  };
  const showPdf=(pdf)=>{
    window.open(`http://localhost:5000/files/${pdf}`,"_blank","noreferrer");

  }

  return (
    <div className='app'>
      <form className='formstyle' onSubmit={submitImage}>
        <h4>Upload PDF Files</h4>
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='file'
          className='form-control'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className='btn-btn-primary' type='submit'>
          Submit
        </button>
       
      </form>
      <hr/>
      <div className='upload'>
          <h4>uploaeded pdf</h4>
          <div className='output-div'>
            {allImage==null?"":allImage.map((data)=>{
              return(
                <div className='inner-div'>
                <h6> Title: {data.title}</h6>
                <button className='show-btn' onClick={(file)=>showPdf(data.pdf)}>
                  show pdf
                </button>
  
              </div>
                
              )
            })}
          
          </div>
        </div>
    </div>
  );
};

export default Admin;
