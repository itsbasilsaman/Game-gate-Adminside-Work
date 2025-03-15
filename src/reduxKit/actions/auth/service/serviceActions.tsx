import {configWithTokenMultiPart,axiosIn, configWithToken} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";



export interface Iservice{
    name: string
    nameAr:string 
    icon:File|null
}


 

export const AddServiceAction= createAsyncThunk(
    "admin/addService",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin service data  ",adminCredentials);
            const response = await axiosIn.post(`/admin/service`, adminCredentials,configWithTokenMultiPart());
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

export const EditServiceAction= createAsyncThunk(
    "admin/EditService",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin service data  ",adminCredentials);
            const id = adminCredentials.get('id');
            const response = await axiosIn.put(`/admin/service/${id}`, adminCredentials,configWithTokenMultiPart());
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
export const GetServiceAction= createAsyncThunk(
    "admin/getService",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get service ");
            const response = await axiosIn.get(`/admin/service`,configWithToken());
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

export const GetServiceByIdAction= createAsyncThunk(
    "admin/getServiceById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get service ",id);
            const response = await axiosIn.get(`/admin/service/${id}`,configWithToken());
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
  
export const ActiveInActiveAction= createAsyncThunk(
    "admin/getServiceById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            const response = await axiosIn.patch(`/admin/service/${id}`,configWithToken());
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




  export const DeleteServiceAction= createAsyncThunk(
    "admin/deleteService",
    async (id:string,{rejectWithValue})=>{
        try {
            console.log( "admin delete service id ",id);
            const response = await axiosIn.delete(`/admin/service/${id}`,configWithToken());
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
  



