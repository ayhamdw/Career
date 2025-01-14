import React, { useState } from 'react';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';  // Adding more icons
import styles from './Certificates.module.css';

const Certificates = () => {
  // Sample data for users with certificate status
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', certificateStatus: 'Pending' },
    { id: 2, name: 'Jane Smith', certificateStatus: 'Approved' },
    { id: 3, name: 'Emily Johnson', certificateStatus: 'Rejected' },
    { id: 4, name: 'Michael Brown', certificateStatus: 'Pending' },
    { id: 5, name: 'Sara White', certificateStatus: 'Approved' },
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

  return (
    <div className={styles.certificatesContainer}>
      <h1 className={styles.pageTitle}>Certificate Approval</h1>

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
