/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { GetProductAction } from "../../actions/auth/product/productAction";
import { DeleteProductAction } from "../../actions/auth/product/productAction";
import { AddProductAction } from "../../actions/auth/product/productAction";
import { EditProductAction } from "../../actions/auth/product/productAction";
import { ActiveInActiveProductAction } from "../../actions/auth/product/productAction";


export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;
  Serviceid?: string | null;
}



const initialState:UserState  = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,
  Serviceid: localStorage.getItem("Serviceid")
    ? JSON.parse(localStorage.getItem("Serviceid")!)
    : null,
};






export const ProductSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetProductAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(GetProductAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(DeleteProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(DeleteProductAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(DeleteProductAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

      
    .addCase(AddProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(AddProductAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(AddProductAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(EditProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(EditProductAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(EditProductAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })






    .addCase(ActiveInActiveProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(ActiveInActiveProductAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(ActiveInActiveProductAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});



export const {updateError}= ProductSlice.actions
export default ProductSlice
