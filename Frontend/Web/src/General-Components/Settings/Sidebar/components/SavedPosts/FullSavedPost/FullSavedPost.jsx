import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './FullSavedPost.module.css'; 

const FullSavedPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("Post ID: ",postId)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/community/getPostById/${postId}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post: ", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!post) {
    return <div className={styles.error}>Post not found!</div>;
  }

  return (
    <div className={styles.fullPostContainer}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.careerCategory}>{post.careerCategory}</p>
      <p className={styles.location}>Location: {post.location}</p>
      <div className={styles.postImages}>
        {post.images.map((image, index) => (
          <img key={index} src={image} alt={`Post Image ${index + 1}`} className={styles.postImage} />
        ))}
      </div>
      <div className={styles.postContent}>
        <h3>Post Content:</h3>
        <p>{post.content}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.date}>Posted on: {new Date(post.postDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default FullSavedPost;
