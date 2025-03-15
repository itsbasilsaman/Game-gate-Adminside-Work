
import axios from 'axios';

import Cookies from 'js-cookie';

export const URL="https://api.ggtops.com/api/v1";

export const axiosIn = axios.create({
  baseURL: URL,
});

export const config = {
  headers: {
    "Content-Type": "application/json",
   // Retrieve the access token from the cookies
  },
  withCredentials: false // Typically used for CORS requests; set to true if needed for credentials
};


export const configWithTokenMultiPart = () => {
  let token = Cookies.get("accessToken");
  // const  myfd="sfdsdfewsfsf897d8f97d8fds8f78dsf"
  token = token ? token.replace(/^"|"$/g, "").trim() : undefined; // Set undefined instead of null
    console.log("MY token in adminside now :", token);
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : undefined, // Explicitly handle undefined
      },
      withCredentials: false,
    };
  };

   

export const configWithToken = () => {
  let token = Cookies.get("accessToken");
  // const  myfd="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNmQxYWFkMi0wNjVjLTQ5OTMtODBjZS1jNzU5MjQzNTkxYmMiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MzgzOTI3MTJ9.PL5RnndgwAbUEcEppIZl-_RDwl_dIp0vQY0TjVHM6WA"
  token = token ? token.replace(/^"|"$/g, "").trim() : undefined; // Set undefined instead of null
    console.log("MY token in adminside now :", token);
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined, // Explicitly handle undefined
      },
      withCredentials: false,
    };
  };
  
export const configWithTokenk = () => {
  let token = Cookies.get("accessToken");
  // const  myfd="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNmQxYWFkMi0wNjVjLTQ5OTMtODBjZS1jNzU5MjQzNTkxYmMiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3MzgzOTI3MTJ9.PL5RnndgwAbUEcEppIZl-_RDwl_dIp0vQY0TjVHM6WA"
  token = token ? token.replace(/^"|"$/g, "").trim() : undefined; // Set undefined instead of null
    console.log("MY token in adminside now :", token);
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined, // Explicitly handle undefined
      },
   
    };
  };
  

 

