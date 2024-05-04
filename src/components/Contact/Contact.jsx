import css from "./Contact.module.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={css.contactContainer}>
      <li className={css.contactItem}>
        <p className={css.userdata}>
          <FaUserLarge color="coral" />
          Name: {contact.name}
        </p>
        <p className={css.userdata}>
          <FaPhoneAlt color="coral" />
          Phone number: {contact.phoneNumber}
        </p>
      </li>
      <button className={css.button} type="button" onClick={handleDeleteContact}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
