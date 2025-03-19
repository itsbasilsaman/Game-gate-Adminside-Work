import React, { useState, useRef } from 'react';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import { validateBrandData } from './validation'; // Adjust the import path
import { AddBrandAction } from '../../../reduxKit/actions/auth/brand/brandAction';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddBrandData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState<string>('');
  const [nameAr, setNameAr] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [descriptionAr, setDescriptionAr] = useState<string>('');
  const { brandLoading } = useSelector((state: RootState) => state.brand);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name: string; nameAr: string; description: string; descriptionAr: string; image: string }>({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    image: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitBrand = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form
    const { errors, hasError } = validateBrandData(name, nameAr, description, descriptionAr, image);
    setErrors(errors);

    if (!hasError) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('nameAr', nameAr);
      formData.append('description', description);
      formData.append('descriptionAr', descriptionAr);
      if (image) {
        formData.append('image', image);
      }

      try {
        await dispatch(AddBrandAction(formData)).unwrap();
        toast.success('Brand Added Successfully', {
          position: 'top-center',
        });
        // Reset form values
        setName('');
        setNameAr('');
        setDescription('');
        setDescriptionAr('');
        setImage(null);
        setImagePreview(null);
      } catch (error) {
        toast.error('Failed to add brand. Please try again.', {
          position: 'top-center',
        });
        console.log(error);
        
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: '' })); // Clear image error
    }
  };

  const handleUpdateImage = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof typeof errors) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setErrors((prev) => ({ ...prev, [field]: '' })); // Clear specific field error
    };
  };

  return (
    <>
      <Breadcrumb pageName="Brand Section" />

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Brand Section</h3>
            </div>
            <form onSubmit={handleSubmitBrand}>
              <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Brand Name"
                    className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stroke focus:border-primary dark:border-form-strokedark dark:focus:border-primary'
                    }`}
                    value={name}
                    onChange={handleInputChange(setName, 'name')}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NameAr <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Brand Name"
                    className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition ${
                      errors.nameAr
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stroke focus:border-primary dark:border-form-strokedark dark:focus:border-primary'
                    }`}
                    value={nameAr}
                    onChange={handleInputChange(setNameAr, 'nameAr')}
                  />
                  {errors.nameAr && <p className="text-red-500 text-sm mt-1">{errors.nameAr}</p>}
                </div>

                {/* Description */}
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Description"
                    className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition ${
                      errors.description
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stroke focus:border-primary dark:border-form-strokedark dark:focus:border-primary'
                    }`}
                    value={description}
                    onChange={handleInputChange(setDescription, 'description')}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    DescriptionAr <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Description"
                    className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition ${
                      errors.descriptionAr
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-stroke focus:border-primary dark:border-form-strokedark dark:focus:border-primary'
                    }`}
                    value={descriptionAr}
                    onChange={handleInputChange(setDescriptionAr, 'descriptionAr')}
                  />
                  {errors.descriptionAr && <p className="text-red-500 text-sm mt-1">{errors.descriptionAr}</p>}
                </div>

                {/* Image Upload */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark col-span-1 lg:col-span-2">
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Upload Image</h3>
                  </div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center gap-3">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Selected Preview"
                            className="w-20 h-20 object-cover"
                          />
                          <span className="flex gap-2.5">
                            <button
                              type="button"
                              className="text-sm hover:text-red-900 text-red-500"
                              onClick={handleDeleteImage}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="text-sm hover:text-primary text-blue-600"
                              onClick={handleUpdateImage}
                            >
                              Update
                            </button>
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="mb-1.5 text-black dark:text-white">
                            Edit your photo
                          </span>
                          <button
                            type="button"
                            className="text-sm hover:text-primary text-blue-600"
                            onClick={handleUpdateImage}
                          >
                            Update
                          </button>
                        </>
                      )}
                    </div>

                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={handleImageChange}
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        
                        <p>
                          <span className="text-primary">Click to upload</span>
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-1 lg:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark"
                  >
                    {brandLoading ? (
                      <div className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        <span>Adding...</span>
                      </div>
                    ) : (
                      "Add"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBrandData;