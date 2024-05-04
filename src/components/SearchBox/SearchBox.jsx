import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";
import { selectError, selectIsLoading } from "../../redux/contactsSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Find contacts by name</h3>
      <input type="text" value={nameFilter} onChange={handleChange} placeholder="Search by name" className={css.input} />
      {isLoading && !error && <b>Request in progress...</b>}
    </div>
  );
};

export default SearchBox;
