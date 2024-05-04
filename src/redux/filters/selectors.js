import { createSelector } from "@reduxjs/toolkit";

export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;

export const selectFilteredContacts = createSelector(
  [selectNameFilter, selectNumberFilter, (state) => state.contacts],
  (nameFilter, numberFilter, contacts) => {
    return contacts.filter((contact) => {
      const nameMatch = contact.name.toLowerCase().includes(nameFilter.toLowerCase());
      const numberMatch = contact.phoneNumber.includes(numberFilter);
      return nameMatch && numberMatch;
    });
  }
);
