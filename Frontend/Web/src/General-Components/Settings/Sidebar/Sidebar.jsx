import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import style from "./Sidebar.module.css";
import { FaProjectDiagram, FaImage, FaUserEdit, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import axios from 'axios';
import s3 from 'react-aws-s3-typescript'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Sidebar = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [image, setImage] = useState(user?.profile?.profileImage || "");
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef(null);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/signin");
    window.location.reload();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Image loaded:", reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const myId = localStorage.getItem("id");
  const handleCrop = async () => {

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();

      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], "edited-profile-image.png", { type: "image/png" });

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
            const imgURL = data.location;

            console.log("Uploaded image URL:", imgURL);
            await axios.put(`${import.meta.env.VITE_API}/user/changeImage`, { userId: myId, profileImageUrl: imgURL });

            setPreview(imgURL);
            setIsEditing(false);
          } catch (err) {
            console.error("Error uploading image:", err);
          }
        }
      }, "image/png");
    }
  };




  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className={style.sidebarContainer}>
      <div className={style.userInfo}>
        <img
          src={preview || user?.profile?.profileImage || "https://via.placeholder.com/100"}
          alt="User"
          className={style.userPicture}
          onClick={() => setIsEditing(true)}
        />
        <h2 className={style.userName}>
          {user?.profile?.firstName || "Guest"} {user?.profile?.lastName || ""}
        </h2>
      </div>

      {user?.certificate?.isCertified ? (
        <div className={style.certificateVerified}>
          <div className={style.iconWrapper}>
            <FaCheckCircle className={style.checkIcon} />
          </div>
          <span className={style.verifiedText}>Verified</span>
        </div>
      ) : (
        <div className={style.certificateWarning}>
          <div className={style.iconWrapper}>
            <FaTimesCircle className={style.warningIcon} />
            Not Verified{" "}
            <br />
          </div>
          <span className={style.warningText}>
            
            <Link to="/settings/upload-certificate" className={style.uploadLink}>
              upload your certificate.
            </Link>
          </span>
        </div>
      )}






      {isEditing && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h3>Edit Profile Picture</h3>
            <AvatarEditor
              ref={editorRef}
              image={image || user?.profile?.profileImage || "https://via.placeholder.com/100"}
              width={400}
              height={400}
              border={50}
              scale={1.2}
              crossOrigin="anonymous"
            />

            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div className={style.editorButtons}>
              <button onClick={handleCrop} className={style.saveButton}>
                Save
              </button>
              <button onClick={handleCancelEdit} className={style.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
          <div className={style.modalOverlay} onClick={handleCancelEdit}></div>
        </div>
      )}

      <ul className={style.sidebarLinks}>

        <Link to="/settings/portfolio" className={style.sidebarLink}>
          <li>
            <FaImage className={style.icon} />
            <span>Portfolio</span>
          </li>
        </Link>
        <Link to="/settings/change-info" className={style.sidebarLink}>
          <li>
            <FaUserEdit className={style.icon} />
            <span>Change Information</span>
          </li>
        </Link>
        <Link to="/settings/friend-requests" className={style.sidebarLink}>
          <li>
            <FaUserFriends className={style.icon} />
            <span>Friend Requests</span>
          </li>
        </Link>
        <Link to="/settings/friends" className={style.sidebarLink}>
          <li>
            <FaUserFriends className={style.icon} />
            <span>Friends</span>
          </li>
        </Link>
        <Link to="/settings/SavedPosts" className={style.sidebarLink}>
          <li>
            <FaProjectDiagram className={style.icon} />
            <span>Saved Posts</span>
          </li>
        </Link>
        <Link className={style.sidebarLink} onClick={handleLogout}>
          <li>
            <FaSignOutAlt className={style.icon} />
            <span>Logout</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    profile: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      profileImage: PropTypes.string,
    }),
  }),
};

Sidebar.defaultProps = {
  user: {
    profile: {
      firstName: "Guest",
      lastName: "",
      profilePicture: null,
    },
  },
};

export default Sidebar;
