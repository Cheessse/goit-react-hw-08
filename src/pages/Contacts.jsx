import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DocumentTitle } from "../components/DocumentTitle";
import { ContactList } from "../components/ContactList/ContactList";
import { fetchContacts } from "../redux/contacts/operations";
import { selectIsLoading } from "../redux/contacts/selectors";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { SearchBox } from "../components/SearchBox/SearchBox";

const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <ContactForm />
      <DocumentTitle>Your contacts</DocumentTitle>
      <div>{isLoading && "Request in progress..."}</div>
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default Contacts;
