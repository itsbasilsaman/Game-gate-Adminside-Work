/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { getAllsellersAction } from "../../actions/auth/seller/sellerAction";


export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;

  _id?: string | null;
}



const initialState:UserState  = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,

  _id: localStorage.getItem("_id")
    ? JSON.parse(localStorage.getItem("_id")!)
    : null,
};









export const sellerSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(getAllsellersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(getAllsellersAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(getAllsellersAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});



export const {updateError}= sellerSlice.actions
export default sellerSlice
