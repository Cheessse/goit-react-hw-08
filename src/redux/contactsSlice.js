import { createSlice, createSelector } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex((contact) => contact.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const selectContactsState = (state) => state.contacts;

export const selectIsLoading = createSelector([selectContactsState], (contacts) => contacts.isLoading);

export const selectError = createSelector([selectContactsState], (contacts) => contacts.error);

export const selectFilteredContacts = createSelector([selectContactsState, (state) => state.filters.name], (contacts, filterName) => {
  return contacts.items.filter((contact) => contact.name.includes(filterName));
});

export const contactsReducer = contactsSlice.reducer;
