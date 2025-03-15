/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { GetServiceAction } from "../../actions/auth/service/serviceActions";
import { DeleteServiceAction } from "../../actions/auth/service/serviceActions";
import { AddServiceAction } from "../../actions/auth/service/serviceActions";


export interface UserState {
  userData: UserState | null;
  error: string | null;
  serviceLoading: boolean;
  Serviceid?: string | null;
}


const initialState:UserState  = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  serviceLoading: false,
  Serviceid: localStorage.getItem("Serviceid")
    ? JSON.parse(localStorage.getItem("Serviceid")!)
    : null,
};






export const ServiceSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetServiceAction.pending, (state) => {
        state.serviceLoading = true;
        state.error = null;
      })
       
      .addCase(GetServiceAction.fulfilled, (state, { payload }) => {
        state.serviceLoading = false;
        state.error = null;
        state.Serviceid=payload.id
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(GetServiceAction.rejected, (state, { payload }) => {
        state.serviceLoading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(DeleteServiceAction.pending, (state) => {
        state.serviceLoading = true;
        state.error = null;
      })
       
      .addCase(DeleteServiceAction.fulfilled, (state, { payload }) => {
        state.serviceLoading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(DeleteServiceAction.rejected, (state, { payload }) => {
        state.serviceLoading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(AddServiceAction.pending, (state) => {
        state.serviceLoading = true;
        state.error = null;
      })
       
      .addCase(AddServiceAction.fulfilled, (state, { payload }) => {
        state.serviceLoading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(AddServiceAction.rejected, (state, { payload }) => {
        state.serviceLoading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});



export const {updateError}= ServiceSlice.actions
export default ServiceSlice
