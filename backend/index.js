// // backend/app.js
// const express = require('express');
// const cors = require('cors');
// const BackblazeB2 = require('backblaze-b2');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// const b2 = new BackblazeB2({
//   applicationKeyId: process.env.B2_APP_KEY_ID,
//   applicationKey: process.env.B2_APP_KEY,
// });

// // Single endpoint to upload and return an authorized link
// app.post('/upload', async (req, res) => {
//   try {
//     await b2.authorize();  // Authorize the B2 account
//     const uploadUrl = await b2.getUploadUrl({ bucketId: process.env.B2_BUCKET_ID });

//     // `fileData` is expected to be a base64 encoded string from the frontend
//     const fileData = req.body.fileData;
//     const fileName = `uploads/${Date.now()}-${req.body.fileName}`;

//     const uploadResponse = await b2.uploadFile({
//       uploadUrl: uploadUrl.data.uploadUrl,
//       uploadAuthToken: uploadUrl.data.authorizationToken,
//       fileName: fileName,
//       data: Buffer.from(fileData, 'base64'),  // Assuming fileData is base64
//       mime: req.body.fileType,
//     });

//     // Generate a signed URL for the uploaded file if the bucket is private
//     const downloadAuthResponse = await b2.getDownloadAuthorization({
//       bucketId: process.env.B2_BUCKET_ID,
//       fileNamePrefix: fileName,
//       validDurationInSeconds: 3600,  // URL valid for 1 hour
//     });

//     const fileUrl = `https://f005.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}?Authorization=${downloadAuthResponse.data.authorizationToken}`;
    
//     res.status(200).json({ fileUrl });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// backend/app.js
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint to upload a PDF file and return the Cloudinary URL
// app.post('/upload', async (req, res) => {
//   try {
//     const fileData = req.body.fileData; // base64 PDF data
//     const fileName = `images/${Date.now()}-${req.body.fileName}`;

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${fileData}`, {
//       public_id: fileName,
//       folder: 'pdf-uploads', // Optional: organize files in Cloudinary folder
//     });

//     const url = cloudinary.url(result.public_id , {
//       transformation : [
//         {
//           quality : 'auto',
//           fetch_format : 'auto'
//         },
//         {
//           width : 500,
//           height : 500,
//           crop : 'fill',
//           gravity : 'auto'
//         }
//       ]
//     })

//     console.log(url);
//     // Result contains the URL for accessing the PDF
//     res.status(200).json({ fileUrl: url });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'Upload failed' });
//   }
// });

app.post('/upload', async (req, res) => {
  try {
    const fileData = req.body.fileData; // base64 image data
    const fileName = `images/${Date.now()}-${req.body.fileName}`;

    // Upload image to Cloudinary with transformations
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${fileData}`, {
      public_id: fileName,
      folder: 'image-uploads', // Optional: organize files in Cloudinary folder
      transformation: [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
        {
          width: 300,
          height: 300,
          crop: 'fill',
          gravity: 'auto',
        },
      ],
    });

    // The secure_url in the result will contain the transformed image URL
    res.status(200).json({ fileUrl: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
