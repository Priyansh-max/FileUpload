/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from "./pages/Upload"
import PdfViewer from './components/PdfViewer'

function App() {

  return (
    <div>
      <Upload></Upload>
      <PdfViewer fileUrl={"https://res.cloudinary.com/dl22dtf58/image/upload/v1731442188/image-uploads/images/1731442180756-1730828167730-Untitled%20design.pdf.jpg"} />

    </div>
  )
}

export default App
