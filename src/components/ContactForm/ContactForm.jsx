import { useState } from "react";
import css from "./ContactForm.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || phoneNumber.trim() === "") {
      toast.error("Name and phone number are required.", {
        position: "top-right",
      });
    } else if (name.trim().length < 3 || phoneNumber.trim().length < 3) {
      toast.error("Name and phone number must be at least 3 characters long.", {
        position: "top-right",
      });
      setName("");
      setPhoneNumber("");
    } else {
      dispatch(addContact({ name, phoneNumber }));
      setName("");
      setPhoneNumber("");
    }
  };

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <Toaster />
        <input type="text" value={name} onChange={handleChangeName} placeholder="Name" className={css.input} />
        <input type="text" value={phoneNumber} onChange={handleChangePhoneNumber} placeholder="Phone number" className={css.input} />
        <button type="submit" className={css.button}>
          Add contacts
        </button>
      </form>
    </>
  );
};

export default ContactForm;
