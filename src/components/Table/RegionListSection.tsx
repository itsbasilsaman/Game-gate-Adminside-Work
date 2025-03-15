import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reduxKit/store';
import { GetRegionAction, DeleteRegionAction, ActiveInActiveRegionAction, EditRegionAction } from '../../reduxKit/actions/auth/region/regionAction';

interface Region {
  id: string;
  name: string;
  nameAr: string;
  iconUrl: string;
  isActive: boolean;
}

const RegionListSection = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedRegion, setEditedRegion] = useState<Partial<Region>>({});
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);


  console.log(isEditing ,editedRegion);

  useEffect(()=>{

    const GetRegions = async () => {

      try {
        const response = await dispatch(GetRegionAction());
        setRegions(response.payload);
      } catch (error) {
        console.error('Failed to fetch regions:', error);
      }
    };
    GetRegions();
  }, [dispatch]);

  const handleDeleteClick = (id: string) => {
    setSelectedRegionId(id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedRegionId) {
      try {
        await dispatch(DeleteRegionAction(selectedRegionId));
        setRegions(regions.filter(region => region.id !== selectedRegionId));
        toast.success("Region deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete region!");
        console.log(error);
      }
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (region: Region) => {
    setIsEditing(region.id);
    setEditedRegion({ ...region });
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', editedRegion.name || '');
      formData.append('nameAr', editedRegion.nameAr || '');
      await dispatch(EditRegionAction(formData));
      setRegions(regions.map(region => 
        region.id === id ? { ...region, ...editedRegion } : region
      ));
      setIsEditing(null);
      toast.success("Region updated successfully!");
    } catch (error) {
      toast.error("Failed to update region!");
      console.log(error);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await dispatch(ActiveInActiveRegionAction(id));
      setRegions(regions.map(region => 
        region.id === id ? { ...region, isActive: !region.isActive } : region
      ));
      toast.success("Region status updated successfully!");
    } catch (error) {
      toast.error("Failed to update region status!");
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default">
      <div className="py-6 px-4 flex justify-between flex-wrap">
        <h4 className="text-xl font-semibold w-full sm:w-auto">Region List</h4>
        <Link to={'/addregion'}>
          <button className="px-4 py-2 bg-gray-200 hover:bg-gray-100 border-black border w-full sm:w-auto mt-4 sm:mt-0">Add Region</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-6 border-t py-4 px-4 font-medium text-sm sm:text-base">
        <p className="col-span-1">No</p>
        <p className="col-span-1">Icon</p>
        <p className="col-span-1">Region</p>
        <p className="col-span-1">Region (Arabic)</p>
        <div className="col-span-2 sm:col-span-1 text-center">Actions</div>
      </div>

      {regions.map((region, index) => (
        <div key={region.id} className="grid grid-cols-1 sm:grid-cols-6 border-t py-4 px-4 items-center relative text-sm sm:text-base">
          <p className="col-span-1">{index + 1}</p>
          <img src={region.iconUrl} alt="icon" className="col-span-1 w-10 h-10 mx-auto sm:mx-0" />
          {isEditing === region.id ? (
            <>
              <input
                type="text"
                value={editedRegion.name || ''}
                onChange={(e) => setEditedRegion({ ...editedRegion, name: e.target.value })}
                className="col-span-1 border p-1 w-full sm:w-auto"
              />
              <input
                type="text"
                value={editedRegion.nameAr || ''}
                onChange={(e) => setEditedRegion({ ...editedRegion, nameAr: e.target.value })}
                className="col-span-1 border p-1 w-full sm:w-auto"
              />
            </>
          ) : (
            <>
              <p className="col-span-1">{region.name}</p>
              <p className="col-span-1">{region.nameAr}</p>
            </>
          )}
          <div className="col-span-2 sm:col-span-1 flex justify-between items-center">
            {isEditing === region.id ? (
              <button onClick={() => handleSaveEdit(region.id)} className="bg-blue-500 text-white px-3 py-1 rounded w-full sm:w-auto">Save</button>
            ) : (
              <button onClick={() => handleEditClick(region)} className="w-full sm:w-auto">
                <FaEdit className='text-2xl mx-auto sm:mx-0' />
              </button>
            )}
            <button onClick={() => handleDeleteClick(region.id)} className="w-full sm:w-auto">
              <MdDelete className='text-2xl text-red-500 mx-auto sm:mx-0' />
            </button>
            <button
              className={`px-4 py-2 rounded w-full sm:w-auto ${region.isActive ? 'bg-green-500' : 'bg-red-500'} text-white`}
              onClick={() => handleToggleActive(region.id)}
            >
              {region.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDelete={handleDeleteConfirm}
        message="Are you sure you want to delete this region?"
      />
    </div>
  );
};

export default RegionListSection;
