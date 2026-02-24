import React from 'react';

const AdminConfirmModal = ({ open, title, desc, variant, onConfirm, onCancel }) => {
  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`}>
      <div className="modal">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          <button
            className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-confirm'}`}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminConfirmModal;