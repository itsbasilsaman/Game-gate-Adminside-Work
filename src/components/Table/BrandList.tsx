import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit, FaUpload, FaSpinner } from 'react-icons/fa';
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
  const [editedDescription, setEditedDescription] = useState('');
  const [editedDescriptionAr, setEditedDescriptionAr] = useState('');
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [viewDetails, setViewDetails] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { brandLoading, error } = useSelector((state: RootState) => state.brand);

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

  const handleEditClick = (index: number, brand: Brand) => {
    setIsEditing(index);
    setEditedName(brand.name);
    setEditedNameAr(brand.nameAr);
    setEditedDescription(brand.description);
    setEditedDescriptionAr(brand.descriptionAr);
  };

  const handleSaveEdit = async (index: number, id: string) => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', editedName);
    formData.append('nameAr', editedNameAr);
    formData.append('description', editedDescription);
    formData.append('descriptionAr', editedDescriptionAr);
    if (editedImage) {
      formData.append('image', editedImage);
    }

    try {
      await dispatch(EditBrandAction(formData)).unwrap();
      setBrands((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
                ...item,
                name: editedName,
                nameAr: editedNameAr,
                description: editedDescription,
                descriptionAr: editedDescriptionAr,
                image: editedImage ? URL.createObjectURL(editedImage) : item.image,
              }
            : item
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error('Failed to save edit:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (index: number, id: string) => {
    setIsDeleting(index);
    try {
      await dispatch(DeleteBrandAction(id)).unwrap();
      setBrands((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Failed to delete brand:', error);
    } finally {
      setIsDeleting(null);
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
        <div key={brand.id} className="grid grid-cols-1 md:grid-cols-6 border-t py-4 px-4 gap-4">
          {/* Image */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <div className="flex flex-col items-center">
                <img src={brand.image} alt={brand.name} className="h-12 w-12 rounded-md mb-2" />
                <label htmlFor={`image-upload-${index}`} className="cursor-pointer">
                  <FaUpload className="text-blue-600" />
                </label>
                <input
                  id={`image-upload-${index}`}
                  type="file"
                  onChange={(e) => setEditedImage(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />
              </div>
            ) : (
              <img src={brand.image} alt={brand.name} className="h-12 w-12 rounded-md" />
            )}
          </div>

          {/* Name */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p>{brand.name}</p>
            )}
          </div>

          {/* Name (Arabic) */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <input
                type="text"
                value={editedNameAr}
                onChange={(e) => setEditedNameAr(e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              <p>{brand.nameAr}</p>
            )}
          </div>

          {/* Active/Inactive Button */}
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleToggleActive(index, brand.id)}
              className={`px-3 py-1 rounded text-white ${brand.isActive ? 'bg-green-500' : 'bg-red-500'}`}
            >
              {brand.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>

          {/* Edit/Save Button */}
          <div className="col-span-1 flex items-center">
            {isEditing === index ? (
              <button
                onClick={() => handleSaveEdit(index, brand.id)}
                className="text-blue-600 font-bold flex items-center"
                disabled={isSaving}
              >
                {isSaving ? <FaSpinner className="animate-spin mr-2" /> : null}
                Save
              </button>
            ) : (
              <FaEdit onClick={() => handleEditClick(index, brand)} className="cursor-pointer text-blue-600" />
            )}
          </div>

          {/* Delete Button */}
          <div className="col-span-1 flex items-center">
            <button
              onClick={() => handleDelete(index, brand.id)}
              className="text-red-500 font-bold flex items-center"
              disabled={isDeleting === index}
            >
              {isDeleting === index ? <FaSpinner className="animate-spin mr-2" /> : null}
              Delete
            </button>
          </div>

          {/* View Details Button */}
          <div className="col-span-6 flex justify-end">
            <button
              onClick={() => setViewDetails(viewDetails === index ? null : index)}
              className="text-blue-500"
            >
              {viewDetails === index ? 'Hide Details' : 'View Details'}
            </button>
          </div>

          {/* Details */}
          {viewDetails === index && (
            <div className="col-span-6 mt-2">
              <div className="mb-2">
                <strong>Description:</strong>
                {isEditing === index ? (
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{brand.description}</p>
                )}
              </div>
              <div>
                <strong>Description (Arabic):</strong>
                {isEditing === index ? (
                  <textarea
                    value={editedDescriptionAr}
                    onChange={(e) => setEditedDescriptionAr(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{brand.descriptionAr}</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BrandList;