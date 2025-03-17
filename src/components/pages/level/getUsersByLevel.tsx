import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../../reduxKit/store";
import { GetUsersByLevelAction } from "../../../reduxKit/actions/auth/level/levelAction";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners"; // Importing a spinner from react-spinners

interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  rating: number;
  totalTransaction: number;
  lastLogin: string;
}

interface ResponseData {
  level: number;
  totalUsers: number;
  users: User[];
}

const GetUsersByLevel = () => {
  const location = useLocation();
  const extractPath = location.pathname.split("/");
  const selectedLevelId = extractPath[extractPath.length - 1];

  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsersByLevel = async () => {
      try {
        setLoading(true);
        const response = await dispatch(GetUsersByLevelAction(selectedLevelId));
        if (GetUsersByLevelAction.fulfilled.match(response)) {
          setData(response.payload.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersByLevel();
  }, [dispatch, selectedLevelId]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3B82F6" size={50} />
        </div>
      ) : data ? (
        <>
          <div className="py-6 px-4 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
            <h4 className="text-xl font-semibold text-black dark:text-white text-center">
              Level {data.level}
            </h4>
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
              Total Users: {data.totalUsers}
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {data.users?.map((user) => (
              <div
                key={user.id}
                className="w-full p-6 border rounded-lg shadow-sm bg-gray-100 dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-400">Username: {user.userName}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">Email: {user.email}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">Rating: {user.rating}</p>
                <p className="text-sm text-gray-700 dark:text-gray-400">Total Transactions: {user.totalTransaction}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Last Login: {new Date(user.lastLogin).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-400 py-6">
          No data available.
        </div>
      )}
    </div>
  );
};

export default GetUsersByLevel;