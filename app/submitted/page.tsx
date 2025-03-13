import React from 'react';
import styles from './submitted.module.css'; // Import custom CSS for the page

const SubmittedPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        <h1 className={styles.title}>Your Response Has Been Submitted!</h1>
        <p className={styles.message}>Thank you for your submission</p>
      </div>
    </div>
  );
};

export default SubmittedPage;
