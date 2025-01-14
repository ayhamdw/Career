import React, { useState } from 'react';
import styles from './UploadCertificate.module.css';
import s3 from 'react-aws-s3-typescript'
import axios from 'axios'

function UploadCertificate() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imgURL, setImgURL] = useState('');
  const myId = localStorage.getItem("id");

  const handleUpload = async (file) => {
    const Reacts3Client = new s3({
      accessKeyId: "AKIA5MSUBQC3OE6ZOF4Z",
      secretAccessKey: "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",
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: "https://career-images-s3.s3.eu-north-1.amazonaws.com",
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

    }
    catch(error){
      console.log("Error Submit file: ",error)
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.title}>Upload Your Certificate</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* File Upload */}
        <div className={styles.uploadGroup}>
          <label className={styles.label}>Upload Certificate (Image or File)</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf,.docx,.txt"
            className={styles.input}
          />
        </div>

        {/* Image Preview */}
        {filePreview && (
          <div className={styles.previewContainer}>
            <h3>Image Preview:</h3>
            <img src={filePreview} alt="Preview" className={styles.previewImage} />
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Upload Certificate
        </button>
      </form>

      {/* Display uploaded image URL */}
      {imgURL && (
        <div>
          <h3>Uploaded File URL:</h3>
          <a href={imgURL} target="_blank" rel="noopener noreferrer">
            {imgURL}
          </a>
        </div>
      )}
    </div>
  );
}

export default UploadCertificate;
