/* eslint-disable @typescript-eslint/no-explicit-any */
import {configWithTokenMultiPart,axiosIn, configWithToken} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddRegionAction= createAsyncThunk(
    "admin/addProduct",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
        
          
            for (const [key, value] of adminCredentials) {
              console.log(key, value);
            }
            const response = await axiosIn.post(`/admin/region`, adminCredentials,configWithTokenMultiPart());
            console.log("the region", response);
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
  export const GetRegionAction= createAsyncThunk(
    "admin/getRegion",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get region ");
            const response = await axiosIn.get(`/admin/region`,configWithToken());
            console.log("the response get tyhe region data is ", response);
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

export const EditRegionAction= createAsyncThunk(
    "admin/EditProduct",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin Product data  ",adminCredentials);
            const id = adminCredentials.get('id');
            const response = await axiosIn.put(`/admin/products/${id}`, adminCredentials,configWithTokenMultiPart());
            console.log("the response data is of edityed sevices he dat is the  خب سثق ", response);
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



export const GetRegionByIdAction= createAsyncThunk(
    "admin/getServiceById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get service ",id);
            const response = await axiosIn.get(`/admin/products/${id}`,configWithToken());
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
export const ActiveInActiveRegionAction= createAsyncThunk(
    "admin/ActiveInnactive",
    async (id:string,{rejectWithValue})=>{ 
        try {
            const response = await axiosIn.get(`/admin/products/${id}`,configWithToken());
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




  export const DeleteRegionAction = createAsyncThunk(
    "admin/deleteRegion",
    async (id: string, { rejectWithValue }) => {
      try {
        await axiosIn.delete(`/admin/region/${id}`, configWithToken());
        return id; // Return the deleted region ID
      } catch (error:any) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong!");
      }
    }
  );
  



