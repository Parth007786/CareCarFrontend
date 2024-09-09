import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    users: [],
    cars: [],
    message: ""
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
      })
      .addCase(getCars.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSucces = false;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSucces = true;
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSucces = false;
        state.message = action.payload;
      });
  }
});
export default adminSlice.reducer;
//get all users
export const getUsers = createAsyncThunk("FETCH/USERS", async (_, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token;
  try {
    return await adminService.fetchUsers(token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

//get all cars
export const getCars = createAsyncThunk("FETCH/CARS", async (_, thunkAPI) => {
  let token = thunkAPI.getState().auth.user.token;
  try {
    return await adminService.fetchCars(token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
