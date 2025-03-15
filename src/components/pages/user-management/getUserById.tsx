import React, { useEffect, useState } from "react";
import { GetUserByIdAction } from "../../../reduxKit/actions/auth/users/userManagmentAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../reduxKit/store";

type ProfileProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  gender: string;
  profileImage: string | null;
  successfulDeliveries: number;
  createdAt: string;
  lastLogin: string;
  updatedAt: string;
  isActive:boolean;
  level: {
    id: string;
    level: number;
    requiredTransactionsUSD: number;
    requiredTransactionsSR: number;
  };
};

const GetUserById: React.FC = () => {
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId: string }>();


  const formattedDate = (isoString: string) :string => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour : 'numeric',
      minute: 'numeric'
    })
  }

  useEffect(() => {
    const getUserByIds = async () => {
      if (!userId) return;
      try {
        const response = await dispatch(GetUserByIdAction(userId));
        console.log("Fetched User Data:", response.payload.data);
        setProfile(response.payload.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserByIds();
  }, [dispatch, userId]);

  if (!profile) {
    return  (
      <div className="flex justify-center items-center w-full h-full">
      <div className="relative w-12 h-12">
        {/* Spinning Ring */}
        <div className="w-full h-full border-4 border-transparent border-t-blue-900 border-r-blue-900 rounded-full animate-spin"></div>
        {/* Inner Glow Effect */}
        <div className="absolute top-5 left-2 w-12 h-12 bg-blue-900 opacity-20 rounded-full blur-lg"></div>
      </div>
    </div>
    )
  }

  return (
 
  <div className="max-w-5xl mx-auto p-8 flex flex-col lg:flex-row items-center gap-8">
    {/* Profile Image & Name Section */}
    <div className="flex flex-col items-center text-center w-full">
      <img
        src={
          profile.profileImage ||
          "https://via.placeholder.com/150?text=Profile+Image"
        }
        alt="Profile"
        className="w-36 h-36 rounded-full border-4 object-cover border-gray-300 shadow-lg"
      />
      <h2 className="text-3xl font-extrabold mt-4">
        {profile.firstName} {profile.lastName}
      </h2>
      <p className="text-gray-500 text-sm"><strong>username </strong>{profile.userName}</p>
    </div>

    {/* Profile Details Section */}
    <div className="flex flex-col w-full gap-6 text-gray-700">
      <h3 className="text-lg font-bold w-full text-center text-black">Profile Details</h3>
      <p><strong>Email</strong> {profile.email}</p>
      <p><strong>Phone Number</strong> {profile.phoneNumber}</p>
      <p><strong>Gender</strong> {profile.gender}</p>
      <p><strong>Successful Deliveries</strong> {profile.successfulDeliveries}</p>
      <p><strong>Create at</strong>  {formattedDate(profile.createdAt)}</p>
      <p><strong>Last Login</strong> {formattedDate(profile.lastLogin)}</p>
      <p><strong>Updated at</strong> {formattedDate(profile.updatedAt)}</p>
      <button
      className={`px-4 py-2 text-white rounded-md transition-all duration-300 ${
        profile.isActive ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
      }`}
     
    >
      {profile.isActive ? "Active User" : "Inactive User"}
    </button>
      {/* Level Information */}
      <h3 className="text-lg font-bold mt-4 w-full text-center text-black">User Level</h3>
      <p><strong>Level:</strong> {profile.level.level}</p>
      <p><strong>Required Transactions (USD):</strong> {profile.level.requiredTransactionsUSD}</p>
      <p><strong>Required Transactions (SR):</strong> {profile.level.requiredTransactionsSR}</p>
    </div>
  </div>
);

 
};

export default GetUserById;
