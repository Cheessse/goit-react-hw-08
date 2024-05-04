import { createSelector } from "@reduxjs/toolkit";

export const selectContactsState = (state) => state.contacts;

export const selectIsLoading = createSelector([selectContactsState], (contacts) => contacts.isLoading);

export const selectError = createSelector([selectContactsState], (contacts) => contacts.error);
export const selectFilterName = (state) => state.filters.name;

export const selectFilteredContacts = createSelector([selectContactsState, selectFilterName], (contacts, filterName) => {
  if (!contacts.items) {
    return [];
  }
  return contacts.items.filter((contact) => contact.name.toLowerCase().includes(filterName.toLowerCase()));
});
