/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";
import { GetRegionAction,DeleteRegionAction,AddRegionAction,EditRegionAction,ActiveInActiveRegionAction } from "../../actions/auth/region/regionAction";


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






export const RegionSlice = createSlice({
  name: "user",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetRegionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetRegionAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
        state.userData = payload;
        localStorage.setItem("user", JSON.stringify(state.userData));
      })

      .addCase(GetRegionAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(DeleteRegionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(DeleteRegionAction.fulfilled, (state, { payload }) => {
        console.log(payload);
        
        state.loading = false;
        state.error = null;
        state.Serviceid=null
     
      })
      .addCase(DeleteRegionAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

      
    .addCase(AddRegionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(AddRegionAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(AddRegionAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })

    .addCase(EditRegionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(EditRegionAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(EditRegionAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })






    .addCase(ActiveInActiveRegionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(ActiveInActiveRegionAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=null
        state.userData = payload;
      })
      .addCase(ActiveInActiveRegionAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.error = payload as string;
      })


  },
});



export const {updateError}= RegionSlice.actions
export default RegionSlice
