import { Vortex } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.load}>
      <Vortex
        visible={true}
        height="40"
        width="40"
        ariaLabel="vortex-loading"
        colors={["purple", "purple", "purple", "purple", "purple", "purple"]}
      />
    </div>
  );
};
