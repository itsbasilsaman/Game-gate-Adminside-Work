import React, { useState } from "react";
import { validateSubService, FormState, FormErrors } from "./validation";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { AddSubServiceAction } from "../../../reduxKit/actions/auth/subService/subServiceAction";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SubServiceForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { subServiceLoading } = useSelector((state: RootState) => state.subService);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { errors, hasError } = validateSubService(formState);
    console.log("Validation result:", { errors, hasError });

    setErrors(errors);

    if (hasError) {
      console.warn("Form validation failed. Fix errors before submitting.");
      return;
    }

    try {
      
      const formData = new FormData();
      // formData.append('subService', formState.subService);
      formData.append("name", formState.name);
      formData.append("nameAr", formState.nameAr);
      formData.append("description", formState.description);
      formData.append("descriptionAr", formState.descriptionAr);
      console.log("Dispatching action with:", formData);
      await dispatch(AddSubServiceAction(formData)).unwrap();
      toast.success("Sub Service Created Successfully");

      setFormState({
        name: "",
        nameAr: "",
        description: "",
        descriptionAr: "",
        
      });
    } catch (error) {
      console.error("Failed to add sub-service:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Sub Service
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Arabic Name */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  اسم عربي (Arabic Name)
                </label>
                <input
                  type="text"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.nameAr}
                  onChange={(e) => handleChange("nameAr", e.target.value)}
                />
                {errors.nameAr && (
                  <p className="text-red-500 text-sm">{errors.nameAr}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              {/* Arabic Description */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  وصف عربي (Arabic Description)
                </label>
                <textarea
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none"
                  value={formState.descriptionAr}
                  onChange={(e) =>
                    handleChange("descriptionAr", e.target.value)
                  }
                ></textarea>
                {errors.descriptionAr && (
                  <p className="text-red-500 text-sm">{errors.descriptionAr}</p>
                )}
              </div>

              

              {/* Full width button on large screens */}
              <div className="col-span-1 lg:col-span-2">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-70"
                  disabled={subServiceLoading}
                >
                  {subServiceLoading ? (
                    <span className="relative flex h-5 w-5">
                      <span className="absolute inline-block h-full w-full animate-spin rounded-full border-[3px] border-white border-t-transparent"></span>
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubServiceForm;
