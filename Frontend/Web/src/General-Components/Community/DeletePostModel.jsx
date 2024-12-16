import React, { useState } from "react";
import styles from "./Modal.module.css"; 

const DeletePostModal = ({ isOpen, postId, onClose, onConfirm }) => {
  if (!isOpen) return null; 

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Are you sure you want to delete this post?</h2>
        <div className={styles.modalButtons}>
          <button
            className={styles.confirmButton}
            onClick={() => {
              onConfirm(postId);
              onClose();
            }}
          >
            Yes, Delete
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
