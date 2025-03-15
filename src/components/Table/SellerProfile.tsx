import React, { useEffect, useState } from "react";

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  language: string[];
  memberSince: string;
  profileImage: string | null;
};

const dummyUser: UserProfile = {
  firstName: "Muhammed",
  lastName: "Saleel",
  email: "saleelvt57@gmail.com",
  phoneNumber: "+919875644323",
  country: "India",
  language: ["English", "Malayalam"],
  memberSince: "2025-01-24T15:09:46.288Z",
  profileImage:  'https://tse3.mm.bing.net/th?id=OIP.sEoIm1ark5vItx86vAk9dQHaJQ&pid=Api&P=0&h=180',  
};

const SellerProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Simulating API call with dummy data
    setTimeout(() => {
      setUserProfile(dummyUser);
    }, 1000); // Adding a small delay to simulate loading
  }, []);

  if (!userProfile)
    return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-3xl p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={
              userProfile.profileImage
                ? userProfile.profileImage
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg mb-4"
          />

          {/* Info Box for Name and Email */}
          <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg text-center">
            <h1 className="text-xl font-bold text-blue-900 mb-2">
              {userProfile.firstName} {userProfile.lastName}
            </h1>
            <p className="text-sm text-gray-600">{userProfile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500">Phone</h2>
            <p className="text-lg font-semibold text-gray-800">
              {userProfile.phoneNumber}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500">Country</h2>
            <p className="text-lg font-semibold text-gray-800">
              {userProfile.country}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500">Language</h2>
            <p className="text-lg font-semibold text-gray-800">
              {userProfile.language.join(", ")}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-500">Member Since</h2>
            <p className="text-lg font-semibold text-gray-800">
              {new Date(userProfile.memberSince).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
