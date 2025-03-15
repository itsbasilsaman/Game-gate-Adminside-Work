/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { GetLevelAction,GetUsersByLevelAction,UpdateLevelAction,GetLevelByIdAction,AddLevelAction } from "../../actions/auth/level/levelAction";



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






export const level = createSlice({
  name: "level",
  initialState:initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(GetLevelAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetLevelAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
     
      })
      .addCase(GetLevelAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
    .addCase(GetUsersByLevelAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(GetUsersByLevelAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
     
      })
      .addCase(GetUsersByLevelAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })


      .addCase(AddLevelAction.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
             
            .addCase(AddLevelAction.fulfilled, (state, { payload }) => {
              state.loading = false;
              state.error = null;
              state.Serviceid=payload.id

            })
            .addCase(AddLevelAction.rejected, (state, { payload }) => {
              state.loading = false;
              state.error = payload as string;
            })

      .addCase(GetLevelByIdAction.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
             
            .addCase(GetLevelByIdAction.fulfilled, (state, { payload }) => {
              state.loading = false;
              state.error = null;
              state.Serviceid=payload.id

            })
            .addCase(GetLevelByIdAction.rejected, (state, { payload }) => {
              state.loading = false;
              state.error = payload as string;
            })

    .addCase(UpdateLevelAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       
      .addCase(UpdateLevelAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.Serviceid=payload.id
      
      })
      .addCase(UpdateLevelAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })

    
  },
});



export const {updateError}= level.actions
export default level
