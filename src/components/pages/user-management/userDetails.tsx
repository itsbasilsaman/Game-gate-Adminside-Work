/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import {
  GetAllUsersAction,
  BanUserAction,
  UnBanUserAction,
  GetUserByIdAction,
} from "../../../reduxKit/actions/auth/users/userManagmentAction";

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.userManage);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(GetAllUsersAction());
        setUsers(response.payload);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleToggleBan = async (userId: string, isActive: boolean) => {
    try {
      if (isActive) {
        await dispatch(BanUserAction(userId));
      } else {
        await dispatch(UnBanUserAction(userId));
      }
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !isActive } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-black dark:text-white">User List</h4>
      </div>

      {error && (
        <div className="flex justify-center w-full">
          <div className="flex items-center w-1/2 justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
            <p className="font-semibold">Failed to load users. Please try again later.</p>
          </div>
        </div>
      )}

    
      <div className="grid grid-cols-4 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <p className="font-medium text-sm md:text-base">Profile</p>
        <p className="font-medium text-sm md:text-base">User Name</p>
        <p className="font-medium text-sm md:text-base">Level</p>
        <p className="font-medium text-sm md:text-base text-right">Actions</p>
      </div>


        
      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}



      {users.map((user) => (
        <div key={user.id} className="grid grid-cols-4 border-t border-stroke py-4 px-4 dark:border-strokedark md:px-6 2xl:px-7.5 items-center">
          <div className="flex items-center">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600">N/A</span>
              </div>
            )}
          </div>
          <p className="text-sm md:text-base text-black dark:text-white">{user.userName}</p>
          <p className="text-sm md:text-base text-black dark:text-white">{user.level?.level || "N/A"}</p>
          <div className="flex items-center gap-3 justify-end">
            <button
              onClick={() => handleToggleBan(user.id, user.isActive)}
              className={`px-3 py-1 rounded text-sm md:text-base transition-all ${
                user.isActive ? "bg-red-400 text-white" : "bg-green-500 text-white"
              }`}
            >

              {user.isActive ? "Ban The User" : "Unban The User"}
            </button>
            <Link
              to={`/getuser/${user.id}`}
              onClick={() => dispatch(GetUserByIdAction(user.id))}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm md:text-base hover:bg-blue-700"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
