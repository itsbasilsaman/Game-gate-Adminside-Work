import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { AppDispatch, RootState } from '../../reduxKit/store';
import {
  GetAllBrandAction,
  EditBrandAction,
  ActiveBrandInActiveAction,
  DeleteBrandAction,
} from '../../reduxKit/actions/auth/brand/brandAction';

interface Brand {
  id: string; 
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  isActive: boolean;
}

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedNameAr, setEditedNameAr] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const {brandLoading, error} = useSelector((state: RootState) => state.brand);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const resultAction = await dispatch(GetAllBrandAction()).unwrap();
        setBrands(resultAction);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };
    fetchBrands();
  }, [dispatch]);

  const handleToggleActive = async (index: number, id: string) => {
    try {
      await dispatch(ActiveBrandInActiveAction(id)).unwrap();
      setBrands((prev) =>
        prev.map((item, i) => (i === index ? { ...item, isActive: !item.isActive } : item))
      );
    } catch (error) {
      console.error('Failed to toggle active status:', error);
    }
  };

  const handleEditClick = (index: number, name: string, nameAr: string) => {
    setIsEditing(index);
    setEditedName(name);
    setEditedNameAr(nameAr);
  };

  const handleSaveEdit = async (index: number, id: string) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('name', editedName);
    formData.append('nameAr', editedNameAr);

    try {
      await dispatch(EditBrandAction(formData)).unwrap();
      setBrands((prev) =>
        prev.map((item, i) => (i === index ? { ...item, name: editedName, nameAr: editedNameAr } : item))
      );
      setIsEditing(null);
    } catch (error) {
      console.error('Failed to save edit:', error);
    }
  };

  const handleDelete = async (index: number, id: string) => {
    try {
      await dispatch(DeleteBrandAction(id)).unwrap();
      setBrands((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete brand:', error);
    }
  };

  return (
    <div className="rounded-sm border bg-white shadow-default">
      <div className="py-6 px-4 flex justify-between">
        <h4 className="text-xl font-semibold">Brand List</h4>
        <Link to={'/brandAdd'}>
          <button className="px-4 py-2 bg-gray-200 border hover:bg-gray-100">Add New Brand</button>
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

{brandLoading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {brands.map((brand, index) => (
        <div key={brand.id} className="grid grid-cols-6 border-t py-4 px-4">
          <div className="col-span-1 flex items-center">
            <img src={brand.image} alt={brand.name} className="h-12 w-12 rounded-md" />
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="border p-1 rounded" />
            ) : (
              <p>{brand.name}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input type="text" value={editedNameAr} onChange={(e) => setEditedNameAr(e.target.value)} className="border p-1 rounded" />
            ) : (
              <p>{brand.nameAr}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleToggleActive(index, brand.id)}
              className={`px-3 py-1 rounded text-white ${brand.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {brand.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <button onClick={() => handleSaveEdit(index, brand.id)} className="text-blue-600 font-bold">Save</button>
            ) : (
              <FaEdit onClick={() => handleEditClick(index, brand.name, brand.nameAr)} className="cursor-pointer text-blue-600" />
            )}
          </div>
          <div className="col-span-1 flex items-center">
            <button onClick={() => handleDelete(index, brand.id)} className="text-red-500 font-bold">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandList;
