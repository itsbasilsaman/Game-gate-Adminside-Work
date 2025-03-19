import {axiosIn, configWithToken} from "../../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const AddLevelAction= createAsyncThunk(
    "admin/addLevelAction",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            const response = await axiosIn.post(`/admin/level`, adminCredentials,configWithToken());
            console.log("the response add level ", response);
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
  
export const GetLevelAction= createAsyncThunk(
    "admin/getLevel",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get level ");
            const response = await axiosIn.get(`/admin/level`,configWithToken());
            console.log("the response get tyhe level data is ", response);
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


export const UpdateLevelAction= createAsyncThunk(
    "admin/EditLevel",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log( "admin service data  ",adminCredentials);
            const id = adminCredentials.get('id');
            const response = await axiosIn.put(`/admin/level/${id}`, adminCredentials,configWithToken());
            console.log("the response data is of edityed level update  he dat is the  خب سثق ", response);
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
  
export const GetLevelByIdAction= createAsyncThunk(
    "admin/getLevelById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get service ",id);
            const response = await axiosIn.get(`/admin/level/${id}`,configWithToken());
            console.log("the response get tyhe level data is ", response);
            return response.data
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
export const GetUsersByLevelAction= createAsyncThunk(
    "admin/getLevelById",
    async (id:string,{rejectWithValue})=>{ 
        try {
            console.log( "admin get service ",id);
            const response = await axiosIn.get(`/admin/level/${id}/users?limit=10&skip=20`,configWithToken());
            console.log("the  userlevel  ", response);
            return response.data
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
  