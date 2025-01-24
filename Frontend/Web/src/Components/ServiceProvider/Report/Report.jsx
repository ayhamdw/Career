import React, { useState, useEffect } from "react";
import axios from "axios";
import s3 from 'react-aws-s3-typescript';

const Report = ({ setShowReportForm }) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [reason, setReason] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/user/Allusers`);
        setUsers(response.data);
      } catch (error) {
        console.log("Error Fetching Users: ", error);
      }
    };
    getAllUsers();
  }, []);

  const handleUpload = async (file) => {
    const ReactS3Client = new s3({
      accessKeyId: "AKIA5MSUBQC3OE6ZOF4Z",
      secretAccessKey: "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",
      bucketName: "career-images-s3",
      dirName: "media",
      region: "eu-north-1",
      s3Url: "https://career-images-s3.s3.eu-north-1.amazonaws.com",
    });

    try {
      const response = await ReactS3Client.uploadFile(file);
      return response.location;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed. Please try again.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !reason || !image) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const imageUrl = await handleUpload(image);

      const response = await axios.post(`${import.meta.env.VITE_API}/Complaint/report`, {
        userId: selectedUser,
        documentationImage: imageUrl,
        complaintText: reason,
      });

      setMessage(response.data.message || "Report submitted successfully!");
      setShowReportForm(false);
    } catch (error) {
      console.error("Error submitting report:", error);
      setMessage("Failed to submit the report. Please try again.");
    }
  };

  return (
    <div className="reportFormContainer">
      <div className="reportFormContent">
        <h3>Report a User</h3>
        {message && <p>{message}</p>}
        <form onSubmit={handleReportSubmit}>
          <label htmlFor="user">Choose a User:</label>
          <select
            id="user"
            name="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                <img
                  src={user.profile.profileImage}
                  alt={`${user.profile.firstName} ${user.profile.lastName}`}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                {user.profile.firstName} {user.profile.lastName}
              </option>
            ))}
          </select>

          <label htmlFor="reason">Reason for Reporting:</label>
          <textarea
            id="reason"
            name="reason"
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please explain why you want to report this user."
            required
          />

          <label htmlFor="image">Upload an Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">Submit Report</button>
          <button type="button" onClick={() => setShowReportForm(false)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
