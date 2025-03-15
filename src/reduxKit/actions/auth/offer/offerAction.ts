import {axiosIn, configWithToken} from "../../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";


  export const GetAllOfferAction= createAsyncThunk(

    "admin/getOffer",

    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get user ");
       const response = await axiosIn.get(`/admin/offer?page=1&limit=100&verificationStatus=REJECTED&orderBy=asc`,configWithToken());
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

interface myData {
  status:string
  adminNote:string
  id:string
}


export const UpdateStatusOfferAction= createAsyncThunk(
    "admin/UpdateStatusOfferAction",
    async (data:myData,{rejectWithValue})=>{ 
        try {
          const mydata={
            status:data.status,
            adminNote:data.adminNote
          }
          console.log("Sending payload:", mydata);
            const response = await axiosIn.post(`/admin/offer/update-status/${data.id}`,mydata,configWithToken());
            console.log("the response get tyhe unban data is ", response);
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





