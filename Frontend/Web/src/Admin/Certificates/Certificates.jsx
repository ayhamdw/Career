import React, { useState, useRef } from 'react';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';  // Adding Eye icon for preview
import styles from './Certificates.module.css';

const Certificates = () => {
  // Sample data for users with certificate status and uploaded files (image or other file types)
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      certificateStatus: 'Pending', 
      uploadedFile: 'https://randomuser.me/api/portraits/men/1.jpg' // Example image
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      certificateStatus: 'Approved', 
      uploadedFile: 'https://www.w3.org/WAI/WCAG21/quickref/files/example-pdf.pdf' // Example PDF
    },
    { 
      id: 3, 
      name: 'Emily Johnson', 
      certificateStatus: 'Rejected', 
      uploadedFile: 'https://randomuser.me/api/portraits/women/3.jpg' // Example image
    },
    { 
      id: 4, 
      name: 'Michael Brown', 
      certificateStatus: 'Pending', 
      uploadedFile: 'https://www.w3.org/WAI/WCAG21/quickref/files/example-textfile.txt' // Example text file
    },
    { 
      id: 5, 
      name: 'Sara White', 
      certificateStatus: 'Approved', 
      uploadedFile: 'https://randomuser.me/api/portraits/women/5.jpg' // Example image
    },
  ]);

  // Function to handle approval of certificate
  const approveCertificate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, certificateStatus: 'Approved' } : user
    ));
  };

  // Function to handle rejection of certificate
  const rejectCertificate = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, certificateStatus: 'Rejected' } : user
    ));
  };

  // Function to filter users by status
  const filterUsersByStatus = (status) => {
    return users.filter(user => user.certificateStatus === status);
  };

  // Preview modal state
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  // Open the file preview modal
  const openPreview = (file) => {
    setPreviewFile(file);
    setShowPreview(true);
  };

  // Close the preview modal
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
          {filterUsersByStatus('Pending').map(user => (
            <div key={user.id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userInfo}>Awaiting certificate approval.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextPending}>
                  {user.certificateStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.uploadedFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.uploadedFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.approveBtn} 
                  onClick={() => approveCertificate(user.id)}
                >
                  <FaCheck className="icon" /> Approve
                </button>
                <button 
                  className={styles.rejectBtn} 
                  onClick={() => rejectCertificate(user.id)}
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
          {filterUsersByStatus('Approved').map(user => (
            <div key={user.id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userInfo}>Has uploaded certificate.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextApproved}>
                  {user.certificateStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.uploadedFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.uploadedFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.approveBtn} 
                  disabled
                >
                  <FaCheck className="icon" /> Approved
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Users Section */}
      <div className={styles.sectionContainer}>
        <h2 className={styles.sectionTitle}>Rejected Users</h2>
        <div className={styles.userList}>
          {filterUsersByStatus('Rejected').map(user => (
            <div key={user.id} className={styles.userCard}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userInfo}>Certificate was rejected.</p>
              <p className={styles.certificateStatus}>
                Status: 
                <span className={styles.statusTextRejected}>
                  {user.certificateStatus}
                </span>
              </p>
              <div className={styles.uploadedFile}>
                {user.uploadedFile && (
                  <div>
                    <button className={styles.previewBtn} onClick={() => openPreview(user.uploadedFile)}>
                      <FaEye className="icon" /> Preview
                    </button>
                  </div>
                )}
              </div>
              <div className={styles.actions}>
                <button 
                  className={styles.rejectBtn} 
                  disabled
                >
                  <FaTimes className="icon" /> Rejected
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Certificates;
