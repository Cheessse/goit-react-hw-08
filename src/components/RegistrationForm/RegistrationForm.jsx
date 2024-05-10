import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const RegistrationForm = () => {
  const dispatch = useDispatch();

  const userSchema = Yup.object({
    name: Yup.string().min(3, "Must be at least 3 characters").max(50, "Must be 50 characters or less").required("Required").trim(),
    email: Yup.string().email().required("Required").trim(),
    password: Yup.string().min(3, "Must be at least 3 characters").trim().max(10, "Must be 10 characters or less").required("Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={userSchema}>
      <Form autoComplete="off" className={css.form}>
        <div className={css.container}>
          <Field type="text" name="name" placeholder="Username" className={css.input} />
          <ErrorMessage name="name" component="div" className={css.error} />
        </div>

        <div className={css.container}>
          <Field type="email" name="email" placeholder="Email" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />
        </div>

        <div className={css.container}>
          <Field type="password" name="password" placeholder="Password" className={css.input} />
          <ErrorMessage name="password" component="div" className={css.error} />
        </div>

        <button type="submit" className={css.btn}>
          Register
        </button>
      </Form>
    </Formik>
  );
};
