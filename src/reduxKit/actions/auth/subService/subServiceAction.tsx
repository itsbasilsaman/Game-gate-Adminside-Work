import {axiosIn, configWithToken} from "../../../../config/constants";
 
import { createAsyncThunk } from "@reduxjs/toolkit";
 
export interface Iservice{
    name: string
    nameAr:string 
    icon:File|null
}
 
export const AddSubServiceAction= createAsyncThunk(
    "admin/addService",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin service data is   ",adminCredentials);
            const response = await axiosIn.post(`/admin/sub-service`, adminCredentials,configWithToken());
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

export const EditSubServiceAction= createAsyncThunk(
    "admin/EditService",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin service data  ",adminCredentials);
            const id = adminCredentials.get('id');
            const response = await axiosIn.put(`/admin/sub-service/${id}`, adminCredentials,configWithToken());
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

export const GetSubServiceAction= createAsyncThunk(
    "admin/getService",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get service ");
            const response = await axiosIn.get(`/admin/sub-service`,configWithToken());
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

export const GetSubServiceByIdAction= createAsyncThunk(
    "admin/getServiceById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get service ",id);
            const response = await axiosIn.get(`/admin/sub-service/${id}`,configWithToken());
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
export const ActiveInActiveSubServiceAction= createAsyncThunk(
    "admin/getServiceById",
    async (id:string,{rejectWithValue})=>{ 
        try {
          console.log("the id of acitive innactive subservice ",id);
          
            const response = await axiosIn.patch(`/admin/sub-service/${id}`,configWithToken());
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




  export const DeleteSubServiceAction= createAsyncThunk(
    "admin/deleteService",
    async (id:string,{rejectWithValue})=>{
        try {
            console.log( "admin delete service id ",id);
            const response = await axiosIn.delete(`/admin/sub-service/${id}`,configWithToken());
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
  



