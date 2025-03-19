/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetLevelAction, UpdateLevelAction } from '../../../reduxKit/actions/auth/level/levelAction';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LevelListSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [levels, setLevels] = useState<any[]>([]);
  const [detailedLevelId, setDetailedLevelId] = useState<string | null>(null);
   
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedLevel, setEditedLevel] = useState<Partial<any>>({});

  const { loading} = useSelector((state:RootState) => state.level)

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const resultAction = await dispatch(GetLevelAction());
        if (GetLevelAction.fulfilled.match(resultAction)) {
          setLevels(resultAction.payload.data.levels);
          console.log('Set Levels',resultAction.payload.data.levels);
          
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
    setDetailedLevelId((prevLvl) => (prevLvl === id ? null : id));
  };

  const handleLevelByIdFunction = (id: string) => {
    console.log(id);
    navigate(`/getlevels/${id}`);
  };

  const handleEditClick = (level: any) => {
    setIsEditing(level.id);
    setEditedLevel({ ...level });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedLevel((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async (id: string) => {
    try {
      const updatedData = new FormData();
      updatedData.append('id', id);
      updatedData.append('requiredTransactionsUSD', editedLevel.requiredTransactionsUSD?.toString() || '0');
      updatedData.append('requiredTransactionsSR', editedLevel.requiredTransactionsSR?.toString() || '0');
  
      const resultAction = await dispatch(UpdateLevelAction(updatedData));
  
      if (UpdateLevelAction.fulfilled.match(resultAction)) {
        setLevels((prevLevels) =>
          prevLevels.map((level) =>
            level.id === id ? { ...level, ...Object.fromEntries(updatedData.entries()) } : level
          )
        );
        setIsEditing(null);
      } else {
        console.error("Failed to update level: ", resultAction.payload || resultAction.error);
      }
    } catch (error) {
      console.error("Unexpected error while updating level: ", error);
    }
  };
  
 

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">Level List</h4>
      </div>

      <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
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
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Level by Users</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">View Detail</p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      { 
    Array.isArray(levels) && levels.length > 0 ?  ( levels.map((level) => (
        <div key={level.id}>
          <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-6 md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">{level.level}</p>
            </div>
            <div className="col-span-1 flex items-center">
              {isEditing === level.id ? (
                <input
                  type="number"
                  value={editedLevel.requiredTransactionsUSD || ''}
                  onChange={(e) => handleInputChange('requiredTransactionsUSD', e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <p className="text-sm text-black dark:text-white">{level.requiredTransactionsUSD}</p>
              )}
            </div>
            <div className="col-span-1 flex items-center">
              {isEditing === level.id ? (
                <input
                  type="number"
                  value={editedLevel.requiredTransactionsSR || ''}
                  onChange={(e) => handleInputChange('requiredTransactionsSR', e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <p className="text-sm text-black dark:text-white">{level.requiredTransactionsSR}</p>
              )}
            </div>
            <div className="col-span-1 flex items-center">
              {isEditing === level.id ? (
                <button
                  onClick={() => handleUpdate(level.id)}
                  className="text-sm bg-green-500 px-3 py-2 text-white font-bold"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(level)}
                  className="text-sm bg-blue-500 px-3 py-2 text-white font-bold"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="col-span-1 flex items-center">
              <button
                className="text-sm bg-blue-800 px-3 py-2 rounded-md text-white font-bold"
                onClick={() => handleLevelByIdFunction(level.id)}
              >
                Get Users
              </button>
            </div>
            <div className="col-span-1 flex items-center">
              <button
                className="text-sm bg-blue-950 px-3 py-2 rounded-md text-white font-bold"
                onClick={() => handleViewDetails(level.id)}
              >
                View Detail
              </button>
            </div>
          </div>

          {detailedLevelId === level.id && (
            <div className="col-span-full bg-gray-100 dark:bg-gray-800 p-4 flex justify-around items-center">
              <p>
                <span className="font-medium">Created At - </span> {new Date(level.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Updated At - </span> {new Date(level.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ))):
      <p> </p>
      
      }
    </div>
  );
};

export default LevelListSection;