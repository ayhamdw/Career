import React, { useState } from "react";
import "./ChangeInformation.css";

const ChangeInfo = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle information change logic here
    alert("Information updated successfully!");
  };

  return (
    <div className="page-container">
      <h2>Change Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
};

export default ChangeInfo;
