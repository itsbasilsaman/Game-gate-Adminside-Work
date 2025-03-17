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
  coverImage: string | null; // Add coverImage to the type
  successfulDeliveries: number;
  createdAt: string;
  lastLogin: string;
  updatedAt: string;
  isActive: boolean;
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

  const formattedDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

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
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="relative w-12 h-12">
          {/* Spinning Ring */}
          <div className="w-full h-full border-4 border-transparent border-t-blue-900 border-r-blue-900 rounded-full animate-spin"></div>
          {/* Inner Glow Effect */}
          <div className="absolute top-5 left-2 w-12 h-12 bg-blue-900 opacity-20 rounded-full blur-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8">
      {/* Cover Image Section */}
      <div className="relative w-full h-48 lg:h-64 rounded-lg overflow-hidden shadow-lg">
        <img
          src={
            profile.coverImage ||
            "https://via.placeholder.com/800x300?text=Cover+Image"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Image Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/150?text=Profile+Image"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-extrabold">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          <strong>Username:</strong> {profile.userName}
        </p>
      </div>

      {/* Profile Details Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-700">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">Profile Details</h3>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </p>
          <p>
            <strong>Gender:</strong> {profile.gender}
          </p>
          <p>
            <strong>Successful Deliveries:</strong> {profile.successfulDeliveries}
          </p>
          <p>
            <strong>Created At:</strong> {formattedDate(profile.createdAt)}
          </p>
          <p>
            <strong>Last Login:</strong> {formattedDate(profile.lastLogin)}
          </p>
          <p>
            <strong>Updated At:</strong> {formattedDate(profile.updatedAt)}
          </p>
          <button
            className={`px-4 py-2 text-white rounded-md transition-all duration-300 ${
              profile.isActive
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {profile.isActive ? "Active User" : "Inactive User"}
          </button>
        </div>

        {/* Level Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-black">User Level</h3>
          <p>
            <strong>Level:</strong> {profile.level.level}
          </p>
          <p>
            <strong>Required Transactions (USD):</strong>{" "}
            {profile.level.requiredTransactionsUSD}
          </p>
          <p>
            <strong>Required Transactions (SR):</strong>{" "}
            {profile.level.requiredTransactionsSR}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetUserById;