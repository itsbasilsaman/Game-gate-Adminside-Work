import { configWithToken, axiosIn } from "../../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ISeller {
  name: string;
  email: string;
  phone: string;
  address: string;
}
export interface IUpdateSellerStatus {
  userId: string;
  action: string;
  rejectionReason: string|undefined;
}

export const getAllsellersAction = createAsyncThunk(
  "admin/getSellers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosIn.get(`/admin/seller`, configWithToken());
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

export const getSellerByIdAction = createAsyncThunk(
  "admin/getSellerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosIn.get(
        `/admin/seller/${id}`,
        configWithToken()
      );
      console.log("my response 111111", response.data.data.user);

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
);

export const UpdateVerificationSellerAction = createAsyncThunk(
  "admin/UpdateVerificationSellerAction",
  async (data: IUpdateSellerStatus, { rejectWithValue }) => {
    try {
      const response = await axiosIn.post(
        `/admin/seller/verify`,
        data,
        configWithToken()
      );
      console.log("the rsponse ofhtedata ", response);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }

  })
  

