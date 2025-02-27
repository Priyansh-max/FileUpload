import React from 'react';


// eslint-disable-next-line react/prop-types
const PdfViewer = ({ fileUrl }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <iframe 
        src={fileUrl} 
        style={{height: '300px', width : '300px'}}
        title="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;

