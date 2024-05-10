import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(logIn(values));
      resetForm();
    } catch (error) {
      console.log("Login error");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
      <Form autoComplete="off" className={css.form}>
        <div className={css.container}>
          <Field type="email" name="email" placeholder="Email" className={css.input} />
          <ErrorMessage name="email" component="div" className={css.error} />
        </div>

        <div className={css.container}>
          <Field type="password" name="password" placeholder="Password" className={css.input} />
          <ErrorMessage name="password" component="div" className={css.error} />
        </div>

        <button type="submit" className={css.btn}>
          Login
        </button>
      </Form>
    </Formik>
  );
};
