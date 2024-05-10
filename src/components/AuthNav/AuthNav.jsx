import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./AuthNav.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.item, isActive && css.active);
};

export const AuthNav = () => {
  return (
    <div className={css.link}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Login
      </NavLink>
    </div>
  );
};
