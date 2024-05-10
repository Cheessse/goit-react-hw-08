import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: ''
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .trim()
      .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be 20 characters or less'),
    number: Yup.string()
      .required('Phone number is required')
      .trim()
       .min(3, 'Must be at least 3 characters')
      .max(20, 'Must be 20 characters or less'),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <>
      <h1 className={css.title}>PHONEBOOK</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <Field type="text" name="name" placeholder="Name" className={css.file} />
            <ErrorMessage name="name" component="div" className={css.error} />
          </div>
          <div className={css.container}>
            <Field type="text" name="number" placeholder="Phone Number" className={css.file} />
            <ErrorMessage name="number" component="div" className={css.error} />
          </div>
          <button type="submit" className={css.btn}>Add Contact</button>
        </Form>
      </Formik>
   </>
  );
};




