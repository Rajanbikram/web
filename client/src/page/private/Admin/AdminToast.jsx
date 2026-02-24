import React, { useEffect } from 'react';

const AdminToast = ({ message, show, onHide }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onHide(), 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default AdminToast;