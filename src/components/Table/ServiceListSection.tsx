import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetServiceAction, DeleteServiceAction, EditServiceAction, ActiveInActiveAction } from '../../reduxKit/actions/auth/service/serviceActions';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from './Modal';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../reduxKit/store';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Service } from '../../interfaces/admin/services';


const ServiceListSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedService, setEditedService] = useState<Partial<Service>>({});
  const { serviceLoading, error } = useSelector((state: RootState) => state.service);
  const [detailedServiceId, setDetailedServiceId] = useState<string | null>(null); // State for detailed service ID

  useEffect(() => {
    const GetServiceList = async () => {
      try {
        const resultAction = await dispatch(GetServiceAction());
        if (GetServiceAction.fulfilled.match(resultAction)) {
          setServices(resultAction.payload);
        } else {
          console.error("Failed to fetch services: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching services: ", error);
      }
    };
    GetServiceList();
  }, [dispatch]);
  const handleViewDetails = async (id: string) => {
    if (detailedServiceId === id) {
      setDetailedServiceId(null); // Collapse if already expanded
    } else {
      setDetailedServiceId(id); // Expand the selected service
    }
  };
  const handleDeleteClick = (id: string) => {
    setSelectedServiceId(id);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (selectedServiceId) {
      try {
        const resultAction = await dispatch(DeleteServiceAction(selectedServiceId));
        if (DeleteServiceAction.fulfilled.match(resultAction)) {
          setServices(services.filter((service) => service.id !== selectedServiceId));
          toast.success("Service deleted successfully!");
        } else {
          toast.error("Failed to delete service: " + (resultAction.payload || resultAction.error));
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error("Delete error: ", error);
      }
    }
    setIsModalOpen(false);
  };
  
  const handleEditClick = (service: Service) => {
    setIsEditing(service.id);
    setEditedService({ ...service });
  };

  const handleInputChange = (field: keyof Service, value: string) => {
    setEditedService((prev) => ({ ...prev, [field]: value }));
  };

  // const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setEditedService((prev) => ({ ...prev, iconUrl: reader.result as string }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleToggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const resultAction = await dispatch(ActiveInActiveAction(id));
      if (ActiveInActiveAction.fulfilled.match(resultAction)) {
        toast.success(`Service ${!currentStatus ? "activated" : "deactivated"} successfully!`);
        setServices((prev) =>
          prev.map((service) =>
            service.id === id ? { ...service, isActive: !currentStatus } : service
          )
        );
      } else {
        toast.error("Failed to update status: " + (resultAction.payload || resultAction.error));
      }
    } catch (error) {
      toast.error("An unexpected error occurred while updating status.");
      console.error("Toggle status error: ", error);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const formData = new FormData();
      if (editedService.name !== undefined) {
        formData.append('name', editedService.name);
      }
      if (editedService.nameAr !== undefined) {
        formData.append('nameAr', editedService.nameAr);
      }
      if (editedService.iconUrl) formData.append('icon', editedService.iconUrl);
      if (editedService.id) formData.append('id', editedService.id);

      const response = await dispatch(EditServiceAction(formData));
      console.log("after edit the data ", response);

      setServices(services.map((service) => (service.id === id ? { ...service, ...editedService } : service)));
      setIsEditing(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">Service List</h4>
        <Link to={'/addservice'}>
          <button className="px-[12px] py-[8px] bg-gray-200 font-medium border-black border hover:bg-gray-100">
            Add Service
          </button>
        </Link>
      </div>

      {error && (
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
            <p className="font-semibold">Failed to load services. Please try again later.</p>
          </div>
        </div>
      )}

      
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Service Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Service Name (Arabic)</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Edit</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Delete</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {serviceLoading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}


      {services.map((service) => (
        <div key={service.id}>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              {isEditing === service.id ? (
                <input
                  type="text"
                  value={editedService.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <p className="text-sm text-black dark:text-white">{service.name}</p>
              )}
            </div>

            <div className="col-span-2 flex items-center">
              {isEditing === service.id ? (
                <input
                  type="text"
                  value={editedService.nameAr || ''}
                  onChange={(e) => handleInputChange('nameAr', e.target.value)}
                  className="border p-1 rounded"
                />
              ) : (
                <p className="text-sm text-black dark:text-white">{service.nameAr}</p>
              )}
            </div>

            <div className="col-span-1 flex items-center">
              {isEditing === service.id ? (
                <button
                  onClick={() => handleUpdate(service.id)}
                  className="text-sm bg-blue-500 p-1 rounded-md text-black dark:text-white font-bold"
                >
                  Update
                </button>
              ) : (
                <FaEdit className='text-2xl' onClick={() => handleEditClick(service)} />
              )}
            </div>

            <div className="col-span-1 hidden items-center sm:flex">
              <button onClick={() => handleDeleteClick(service.id)}>
                <MdDelete className='text-2xl' />
              </button>
            </div>
            <div className="col-span-1 flex items-center">
              <button
                onClick={() => handleToggleActiveStatus(service.id, service.isActive)}
                className={`px-3 py-1 text-sm rounded-md ${
                  service.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {service.isActive ? "Active" : "Inactive"}
              </button>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <button
                onClick={() => handleViewDetails(service.id)}
                className="text-sm bg-blue-500 p-1 rounded-md text-white font-bold"
              >
                View Details
              </button>
            </div>
          </div>

          {detailedServiceId === service.id && (
            <div className="col-span-full bg-gray-100 dark:bg-gray-800 p-4 flex  justify-around items-center">
              {service.iconUrl && (
                <img
                  src={service.iconUrl}
                  alt="Service Icon"
                  className="mt-2 h-16 w-16 rounded"
                />
              )}
              <p>Name: {service.name}</p>
              <p>Name (Arabic): {service.nameAr}</p>
            
              
            </div>
          )}
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDelete={handleDeleteConfirm}
        message="Are you sure you want to delete this service? This will also delete the related Sub Services."
      />
    </div>
  );
};

export default ServiceListSection;