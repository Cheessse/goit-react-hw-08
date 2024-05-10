import Modal from 'react-modal';

import css from './ModalDelete.module.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    width: '400px',
    height: '220px',
    backgroundColor: '#e3d0e0',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

Modal.setAppElement('#root');

export const ModalDelete = ({ isOpen, onRequestClose, onDelete }) => { 
  

    const handleDelete = () => {
    onDelete(); 
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Delete Contact Modal"
    >
      <h2 className={css.title}>Confirm Delete</h2> 
      <p className={css.text}>Are you sure you want to delete this contact?</p> 
      <div className={css.wrap}>
          <button onClick={handleDelete} className={css.btn}>Delete</button> 
          <button onClick={onRequestClose} className={css.btn}>Cancel</button>
      </div>
    </Modal>
  );
};

