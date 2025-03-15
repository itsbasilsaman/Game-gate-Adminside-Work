/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { GetAllUsersAction } from "../../actions/auth/users/userManagmentAction";
import { BanUserAction } from "../../actions/auth/users/userManagmentAction";
import { UnBanUserAction } from "../../actions/auth/users/userManagmentAction";
import { GetUserByIdAction } from "../../actions/auth/users/userManagmentAction";




export interface UserState {

  error: string | null;
  loading: boolean;
  Serviceid?: string | null;
}


const initialState:UserState  = {
 
  error: null,
  loading: false,
  Serviceid: localStorage.getItem("Serviceid")
    ? JSON.parse(localStorage.getItem("Serviceid")!)
    : null,
};






export const UserSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetAllUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetAllUsersAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
     
      })

      .addCase(GetAllUsersAction.rejected, (state, { payload }) => {
        state.loading = false;
   
        state.error = payload as string;
      })

    .addCase(BanUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(BanUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
      
      })
      .addCase(BanUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

    .addCase(UnBanUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(UnBanUserAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload
    
      })
      .addCase(UnBanUserAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

    .addCase(GetUserByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetUserByIdAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
    
      })
      .addCase(GetUserByIdAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })


  },
});



export const {updateError}= UserSlice.actions
export default UserSlice
