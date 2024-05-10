import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

// інструмент для додавання JWT
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// інструмент для видалення JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk("auth/signup", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/signup", credentials);
    // після успішної реєстрації додаємо токен до HTTP заголовка
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logIn = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/users/login", credentials);
    // після успішного входу додаємо токен до HTTP заголовка
    setAuthHeader(res.data.token);
    Notify.success("Welcome back!");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    // після успішного виходу видаляємо токен з HTTP заголовка
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  // читання токену зі стану за допомогою методу getState()
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    // якщо токену немає, виходимо без виконання будь-якого запиту.
    return thunkAPI.rejectWithValue("Unable to fetch user");
  }

  try {
    // якщо є токен, додаємо його до HTTP заголовка і виконуємо запит.
    setAuthHeader(persistedToken);
    const res = await axios.get("/users/current");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
