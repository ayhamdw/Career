import React, { useState, useRef, useEffect } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';  // Adding Eye icon for preview
import styles from './Certificates.module.css';
import axios from 'axios';






const Certificates = () => {
  const [users, setUsers] = useState([]);

      useEffect(()=>{
        const fetchAllUsers = async()=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_API}/user/Allusers`)
                setUsers(response.data);
            }
            catch(error){
                console.log("Error Fetching Users: ",error);
            }
        }
        fetchAllUsers();
    },[])

    const approveCertificate = async(id) => {
      setUsers(users.map(user =>
        user._id === id 
          ? { 
              ...user, 
              certificate: {
                ...user.certificate,
                verificationStatus: 'verified'
              }
            } 
          : user
      ));

      try{
        await axios.post(`${import.meta.env.VITE_API}/user/verify-certificate`,{
          userId: id
        })
      }
      catch(error){
        console.log("Error Approve Certificate: ",error)
      }
    };
    

    const rejectCertificate = async(id) => {
      setUsers(users.map(user => 
        user._id === id 
          ? { 
              ...user, 
              certificate: {
                ...user.certificate,
                verificationStatus: 'rejected'
              }
            } 
          : user
      ));

      try{
        await axios.post(`${import.meta.env.VITE_API}/user/reject-certificate`,{
          userId: id
        })
      }
      catch(error){
        console.log("Error Approve Certificate: ",error)
      }
      
    };
    

  const filterUsersByStatus = (status) => {
    return users.filter(user => user.certificate.verificationStatus === status);
  };

  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const openPreview = (file) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewFile(null);
  };

  return (
    <div className={styles.certificatesContainer}>
      <h1 className={styles.pageTitle}>Certificate Approval</h1>

      {/* Preview Modal */}
      {showPreview && (
        <div className={styles.previewModal}>
          <div className={styles.previewContent}>
            <button className={styles.closePreviewBtn} onClick={closePreview}>Close</button>
            {previewFile && previewFile.endsWith('.pdf') ? (
              <embed src={previewFile} type="application/pdf" width="100%" height="600px" />
            ) : previewFile && previewFile.endsWith('.txt') ? (
              <iframe src={previewFile} width="100%" height="600px"></iframe>
            ) : previewFile && previewFile.endsWith('.jpg') || previewFile.endsWith('.jpeg') || previewFile.endsWith('.png') ? (
              <img src={previewFile} alt="Preview" className={styles.previewImage} />
            ) : (
              <p>File format not supported for preview.</p>
            )}
          </div>
        </div>
      )}

      {/* Pending Users Section */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Pending Users</h2>
        <div className={styles.userList}>
          {filterUsersByStatus('pending').map(user => (
            <div key={user._id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.profile.firstName} {user.profile.lastName}</h2>
              <p className={styles.userInfo}>Awaiting certificate approval.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextPending}>
                  {user.certificate.verificationStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {true && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.certificate.certificateFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.approveBtn} 
                  onClick={() => approveCertificate(user._id)}
                >
                  <FaCheck className="icon" /> Approve
                </button>
                <button 
                  className={styles.rejectBtn} 
                  onClick={() => rejectCertificate(user._id)}
                >
                  <FaTimes className="icon" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Users Section */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Approved Users</h2>
        <div className={styles.userList}>
          {filterUsersByStatus('verified').map(user => (
            <div key={user._id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.profile.firstName} {user.profile.lastName}</h2>
              <p className={styles.userInfo}>Has uploaded certificate.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextApproved}>
                  {user.certificate.verificationStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.certificate.certificateFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.certificate.certificateFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <div 
                  className={styles.approveBtnA} 
                  disabled
                >
                  <FaCheck className="icon" /> Approved
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Users Section */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Rejected Users</h2>
        <div className={styles.userList}>
          {filterUsersByStatus('rejected').map(user => (
            <div key={user._id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.profile.firstName} {user.profile.lastName}</h2>
              <p className={styles.userInfo}>Certificate was rejected.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextRejected}>
                  {user.certificate.verificationStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.certificate.certificateFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.certificate.certificateFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <div 
                  className={styles.rejectBtnR} 
                  disabled
                >
                  <FaTimes className="icon" /> Rejected
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Users who have not uploaded their files</h2>
        <div className={styles.userList}>
          {filterUsersByStatus('noFile').map(user => (
            <div key={user._id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.profile.firstName} {user.profile.lastName}</h2>
              <p className={styles.userInfo}>Certificate was rejected.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextRejected}>
                  Not Verified
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.certificate.certificateFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.certificate.certificateFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <div 
                  className={styles.rejectedDiv} 
                  disabled
                >
                  <FaTimes className="icon" /> No Uploaded File
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Certificates;
