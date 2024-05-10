import { DocumentTitle } from "../components/DocumentTitle";
import css from "./Pages.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.home_container}>
        <h1 className={css.title}>Hello and welcome! Thanks for visiting our Phonebook</h1>

        <p className={css.home_question}>
          Do you want to{" "}
          <NavLink to="/register" className={css.link}>
            Register
          </NavLink>{" "}
          or{" "}
          <NavLink to="/login" className={css.link}>
            Login
          </NavLink>{" "}
          ?
        </p>
      </div>
    </>
  );
};

export default Home;
