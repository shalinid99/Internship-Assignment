import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";

//A function that accepts an initial state, an object of reducer functions,
//and a "slice name", and automatically generates action creators and action types
// that correspond to the reducers and state.

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userId: null,
    sid: null,
    userName: null,
    userType: null,
    userStatus: null,
    token: null,
  },
  //Reducers are the only way to change states in Redux.
  // It is the only place where you can write logic and calculations.
  // function will accept the previous state of app and action being dispatched,
  //calculate the next state and returns the new object.
  reducers: {
    login(state, action) {
      const token = action.payload;

      const tokenPayload = jwt(token);

      state.isLoggedIn = true;
      state.userId = tokenPayload.userId;
      state.sid = tokenPayload.sid;
      state.userName = tokenPayload.firstName;
      state.userType = tokenPayload.type;
      state.userStatus = tokenPayload.userStatus;
      state.token = token;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userName = null;
      state.sid = null;
      state.userType = null;
      state.userStatus = null;
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
