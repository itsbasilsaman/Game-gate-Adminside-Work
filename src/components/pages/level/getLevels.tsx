/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetLevelAction } from '../../../reduxKit/actions/auth/level/levelAction';
// import { toast } from 'react-toastify';
import { AppDispatch } from '../../../reduxKit/store';
const LevelListSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [levels, setLevels] = useState<any[]>([]);
  const [detailedLevelId, setDetailedLevelId] = useState<string | null>(null);
  // const { levelLoading, error } = useSelector((state: RootState) => state.level);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const resultAction = await dispatch(GetLevelAction());
        if (GetLevelAction.fulfilled.match(resultAction)) {
          setLevels(resultAction.payload.levels);
        } else {
          console.error("Failed to fetch levels: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching levels: ", error);
      }
    };
    fetchLevels();
  }, [dispatch]);

  const handleViewDetails = (id: string) => {
    if (detailedLevelId === id) {
      setDetailedLevelId(null); // Collapse if already expanded
    } else {
      setDetailedLevelId(id); // Expand the selected level
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">Level List</h4>
      </div>

      {/* {error && (
        <div className="w-full justify-center flex items-center">
          <div className="flex items-center w-1/2 justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
            <svg
              className="w-6 h-6 mr-2 text-red-600 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.99-.816 1.99-1.87V6.87C20.99 5.816 20.054 5 19 5H5c-1.054 0-1.99.816-1.99 1.87v8.26c0 1.054.936 1.87 1.99 1.87z"
              />
            </svg>
            <p className="font-semibold">Failed to load levels. Please try again later.</p>
          </div>
        </div>
      )} */}

      <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Level</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Required Transactions (USD)</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Required Transactions (SR)</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {/* {levelLoading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )} */}

      {levels.map((level) => (
        <div key={level.id}>
          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-4 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{level.level}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{level.requiredTransactionsUSD}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{level.requiredTransactionsSR}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <button
                onClick={() => handleViewDetails(level.id)}
                className="text-sm bg-blue-500 p-1 rounded-md text-white font-bold"
              >
                View Details
              </button>
            </div>
          </div>

          {detailedLevelId === level.id && (
            <div className="col-span-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-around items-center">
              <p>Level: {level.level}</p>
              <p>Required Transactions (USD): {level.requiredTransactionsUSD}</p>
              <p>Required Transactions (SR): {level.requiredTransactionsSR}</p>
              <p>Created At: {new Date(level.createdAt).toLocaleDateString()}</p>
              <p>Updated At: {new Date(level.updatedAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LevelListSection;