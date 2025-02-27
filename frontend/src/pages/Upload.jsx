// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1];  // Extract base64 content
      try {
        const response = await axios.post('http://localhost:5000/upload', {
          fileName: file.name,
          fileData: base64Data,
          fileType: file.type,
        });

        console.log('File uploaded:', response.data.fileUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
  );
};

export default Upload;
