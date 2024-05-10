import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/contacts");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk("contacts/addContact", async ({ name, number }, thunkAPI) => {
  try {
    const res = await axios.post("/contacts", { name, number });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId, thunkAPI) => {
  try {
    const res = await axios.delete(`/contacts/${contactId}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateContact = createAsyncThunk("contacts/updateContact", async (credentials, thunkAPI) => {
  const contactId = credentials.id;
  try {
    const res = await axios.patch(`/contacts/${contactId}`, {
      name: credentials.name,
      number: credentials.number,
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
