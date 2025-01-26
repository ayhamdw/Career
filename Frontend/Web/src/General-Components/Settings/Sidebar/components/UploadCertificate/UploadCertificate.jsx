import React, { useState } from 'react';
// import styles from './UploadCertificate.module.css';
import s3 from 'react-aws-s3-typescript'
import axios from 'axios';
import { motion } from "framer-motion";


function UploadCertificate() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imgURL, setImgURL] = useState('');
  const myId = localStorage.getItem("id");

  const handleUpload = async (file) => {
    const Reacts3Client = new s3({
      accessKeyId: import.meta.env.VITE_AWS_ID,
      secretAccessKey: import.meta.env.VITE_AWS_KEY,
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: import.meta.env.VITE_S3_URL,
    });

    try {
      const data = await Reacts3Client.uploadFile(file);
      setImgURL(data.location); 
      console.log("imgURL: ", data.location);
    } catch (err) {
      console.error("Error uploading file: ", err);
      throw err;
    }
  };

  


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image')) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          setFilePreview(fileReader.result);
        };
        fileReader.readAsDataURL(selectedFile); 
      } else {
        setFilePreview(null); 
      }
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (file) {
      await handleUpload(file);
      alert('File uploaded successfully');
    } else {
      alert('Please select a certificate to upload.');
    }

    try{
        await axios.post(`${import.meta.env.VITE_API}/user/update-certificate`,{
        userId: myId,
        certificateFile: imgURL
      });
      console.log("userId:", myId, " url: ",imgURL)
    }
    catch(error){
      console.log("Error Submit file: ",error)
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  py-6">
      <motion.div
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Upload Your Certificate</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Certificate (Image or File)</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Image Preview */}
          {filePreview && (
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-2">Image Preview:</h3>
              <motion.img
                src={filePreview}
                alt="Preview"
                className="mt-2 rounded-lg border border-gray-300 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl hover:from-green-500 hover:to-green-700 transition-all duration-300"
          >
            Upload Certificate
          </button>
        </form>

        {/* Display uploaded image URL */}
        {imgURL && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-gray-700 font-semibold mb-2">Uploaded File URL:</h3>
            <a
              href={imgURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline"
            >
              {imgURL}
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default UploadCertificate;
