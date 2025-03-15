import {configWithTokenMultiPart,axiosIn, configWithToken} from "../../../../config/constants";



import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddProductAction= createAsyncThunk(
    "admin/addProduct",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            // console.log( " Product data is dfdsfdsfdsff################  ",adminCredentials.get("brandId"));
            // console.log( " Product data is dfdsfdsfdsff################  ",adminCredentials.get("deliveryTypes"));
          
            // for (const [key, value] of adminCredentials) {
            //   console.log(key, value);
            // }
            const response = await axiosIn.post(`/admin/products`, adminCredentials,configWithTokenMultiPart());
            console.log("the Products", response);
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

export const EditProductAction= createAsyncThunk(
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

export const GetProductAction= createAsyncThunk(
    "admin/getProduct",
    async (__,{rejectWithValue})=>{
        try {
            console.log( "admin get service ");
            const response = await axiosIn.get(`/admin/products?page=1&limit=100`,configWithToken());
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


export const GetProductById = createAsyncThunk(
  "admin/getProductId",
  async (id:string, {rejectWithValue}) => {
    try {
      const response = await axiosIn.get(`/admin/products/${id}`, configWithToken());
      return response.data.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
     if(error.response && error.response.data){
      return rejectWithValue(error.response.data)
     } else {
      return rejectWithValue({message: 'Something went wrong!'})
     }
    }
  }
)


 
export const GetSubServiceByIdAction= createAsyncThunk(
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
export const ActiveInActiveProductAction= createAsyncThunk(
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




  export const DeleteProductAction= createAsyncThunk(
    "admin/deleteProduct",
    async (id:string,{rejectWithValue})=>{
        try {
            console.log( "admin delete product ",id);
            const response = await axiosIn.delete(`/admin/products/${id}`,configWithToken());
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
  



