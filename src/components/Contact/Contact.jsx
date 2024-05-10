import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { ModalDelete } from './ModalDelete';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { ModalEdit } from './ModalEdit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './Contact.module.css';

export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .then(() => {
        Notify.success('Contact successfully deleted');
        setIsModalOpen(false);
      })
      .catch((error) => {
        Notify.error('Error deleting contact')
        console.error(error);
      });
  };

  const handleEdit = () => {
  dispatch(updateContact({ id: editedContact.id, name: editedContact.name, number: editedContact.number }))
    .then(() => {
      Notify.success('Contact updated successfully');
      setIsEditModalOpen(false);
    })
    .catch((error) => {
      Notify.error('Error updating contact');
      console.error(error);
    });
};


const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedContact({ ...editedContact, [name]: value });
};


  return (
    <li className={css.list}>
      <p className={css.text}>{contact.name}</p>
      <p className={css.text}>{contact.number}</p>
      <div className={css.wrap}>
        <button type='button' className={css.btn} onClick={() => setIsEditModalOpen(true)}>
          <BiSolidEditAlt className={css.icon} />
        </button>
        <button type="button" onClick={() => setIsModalOpen(true)} className={css.btn}>
          <RiDeleteBin6Line className={css.icon} />
        </button>
      </div>
      <ModalDelete
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onDelete={handleDelete} 
      />
      <ModalEdit
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contact={editedContact}
        handleChange={handleChange}
        onSubmit={handleEdit}
      />
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.object.isRequired, 
};





