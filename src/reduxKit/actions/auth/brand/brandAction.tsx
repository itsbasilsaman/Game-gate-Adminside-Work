/* eslint-disable @typescript-eslint/no-explicit-any */
import {configWithTokenMultiPart,axiosIn, configWithToken} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";



export const AddBrandAction= createAsyncThunk(
    "admin/AddBrandAction",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin brand data  ",adminCredentials);
            const response = await axiosIn.post(`/admin/brand`, adminCredentials,configWithTokenMultiPart());
            console.log("the response data is خب سثق ", response);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )

  
  export const EditBrandAction = createAsyncThunk(
    "admin/EditBrand",
    async (adminCredentials: FormData, { rejectWithValue }) => {
      try {
        console.log("admin service data  ", adminCredentials);
        const id = adminCredentials.get('id');
        const response = await axiosIn.put(`/admin/brand/${id}`, adminCredentials, configWithTokenMultiPart());
        console.log("the response data is of edited brand ", response);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue({ message: "Something went wrong!" });
        }
      }
    }
  );
  
export const GetAllBrandAction= createAsyncThunk(
    "admin/getBrand",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get service ");
            const response = await axiosIn.get(`/admin/brand`,configWithToken());
            console.log("the response get tyhe service data is ", response);
            return response.data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )

export const GetBrandByIdAction= createAsyncThunk(
    "admin/getBrandById", 
    async (id:string,{rejectWithValue})=>{ 
        try { 
            console.log( "admin get brand ",id);
            const response = await axiosIn.get(`/admin/brand/${id}`,configWithToken());
            console.log("the response get tyhe service data is ", response);
            return response.data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  ) 
export const ActiveBrandInActiveAction = createAsyncThunk(
  "admin/ActiveBrandInActive",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosIn.patch(`/admin/brand/${id}`, {}, configWithToken());
      console.log("the response data is ", response);
      return response.data.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

  export const DeleteBrandAction= createAsyncThunk(
    "admin/deleteBrand",
    async (id:string,{rejectWithValue})=>{
        try {
            console.log( "admin delete brand id ",id);
            const response = await axiosIn.delete(`/admin/brand/${id}`,configWithToken());
            console.log("the response delete tyhe service data is ", response);
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )