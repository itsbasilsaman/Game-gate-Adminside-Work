/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Breadcrumbs/Breadcrumb";
// import { validateProductData } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { AddProductAction } from "../../../reduxKit/actions/auth/product/productAction";
import { GetServiceAction } from "../../../reduxKit/actions/auth/service/serviceActions";
import { GetSubServiceAction } from "../../../reduxKit/actions/auth/subService/subServiceAction";
import { ISubService } from "../../../interfaces/admin/subservices";
import { Service } from "../../../interfaces/admin/services";
import Swal from "sweetalert2";
import { GetAllBrandAction } from "../../../reduxKit/actions/auth/brand/brandAction";
import toast from "react-hot-toast";
import { Brand } from "../../../interfaces/admin/brand";

const AddProduct: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.product);
  const { serviceLoading } = useSelector((state: RootState) => state.service);
  const { brandLoading } = useSelector((state: RootState) => state.brand);
  const [brandSearchTerm, setBrandSearchTerm] = useState<string>("");
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState<boolean>(false);
  const { subServiceLoading } = useSelector(
    (state: RootState) => state.subService
  );

  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<{
    serviceId: string;
    brandId: string;
    title: string;
    description: string;
    titleAr: string;
    descriptionAr: string;
    purchaseType: string;
    deliveryTypes: string[];
    subServiceId?: string;
    image: File | null;
  }>({
    serviceId: "",
    brandId: "",
    title: "",
    description: "",
    titleAr: "",
    descriptionAr: "",
    purchaseType: "",
    deliveryTypes: [],
    subServiceId: "",
    image: null,
  });
  const deliveryOptions = [ "IN_GAME", "EMAIL"];
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [services, setServices] = useState<Service[]>([]);
  const [Subservices, setSubServices] = useState<ISubService[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  
 
  const purchaseTypes = [
    "TOP_UP",
    "DIGITAL_PINS",
    "ACCOUNTS",
    "GIFT_CARD",
    "EGIFT_CARDS",
    "RETAIL_GIFT_CARDS",
    "PLATFORM_ENGAGEMENT",
    "EWALLET",
    "COACHING",
    "BOOSTING",
    "ITEMS",
    "GAME_COINS"
  ];
 
  const handleDeliveryTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setProduct((prev) => {
      if (prev.deliveryTypes.includes(value)) {
        // Remove if already selected
        return {
          ...prev,
          deliveryTypes: prev.deliveryTypes.filter((type) => type !== value),
        };
      } else {
        // Add if not selected
        return { ...prev, deliveryTypes: [...prev.deliveryTypes, value] };
      }
    });
  };

  useEffect(() => {
    const GetServiceList = async () => {
      try {
        const resultAction = await dispatch(GetServiceAction());
        if (GetServiceAction.fulfilled.match(resultAction)) {
          setServices(resultAction.payload);
        } else {
          console.error(
            "Failed to fetch services: ",
            resultAction.payload || resultAction.error
          );
        }
      } catch (error) {
        console.error("Unexpected error while fetching services: ", error);
      }
    };
    GetServiceList();
  }, [dispatch]);

  useEffect(() => {
    const GetSubService = async () => {
      try {
        const resultAction = await dispatch(GetSubServiceAction());
        if (GetSubServiceAction.fulfilled.match(resultAction)) {
          setSubServices(resultAction.payload.data);
        } else {
          console.error(
            "Failed to fetch Subservices: ",
            resultAction.payload || resultAction.error
          );
        }
      } catch (error) {
        console.error("Unexpected error while fetching services: ", error);
      }
    };
    GetSubService();
  }, [dispatch]);

  if (services) {
    console.log("12344", services);
  }

  useEffect(() => {
    const GetBrandList = async () => {
      try {
        const resultAction = await dispatch(GetAllBrandAction());
        if (GetAllBrandAction.fulfilled.match(resultAction)) {
          setBrands(resultAction.payload);
        } else {
          console.error(
            "Failed to fetch services: ",
            resultAction.payload || resultAction.error
          );
        }
      } catch (error) {
        console.error("Unexpected error while fetching services: ", error);
      }
    };
    GetBrandList();
  }, [dispatch]);

  if (brands) {
    console.log("the brand data of fetch ***&&&", brands);
  }
  if (Subservices) {
    console.log("the Subservices Subservicestch ***&&&", Subservices);
  }

   // Filter brands based on search term
   const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  const handleBrandSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandSearchTerm(e.target.value);
  };

  const handleBrandDropdownClick = () => {
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
    setBrandSearchTerm(""); // Reset search term when dropdown is toggled
  };

  const handleBrandSelect = (brandId: string) => {
    setProduct((prev) => ({ ...prev, brandId }));
    setIsBrandDropdownOpen(false); // Close dropdown after selection
  };


  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Log the selected service ID when the serviceId changes
    if (name === "serviceId") {
      console.log("Selected Service ID:", value);
    }

    // Log the selected brand ID when the brandId changes
    if (name === "brandId") {
      console.log("Selected Brand ID:", value);
    }

     // Debugging: Log the selected subServiceId
  if (name === "subServiceId") {
    console.log("Selected SubService ID:", value);
  }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Data Before Validation:", product); // Debug log
    console.log("The submit got triggered");

    // Validate product data
    // const validationErrors = validateProductData(product);
    // if (Object.keys(validationErrors).length > 0) {
    //   console.error("Validation errors:", validationErrors);
    //   const errorMessages = Object.values(validationErrors).join("\n");
    //   Swal.fire({
    //     icon: "error",
    //     title: "Validation Error!",
    //     text: errorMessages,
    //     timer: 3000,
    //     toast: true,
    //     showConfirmButton: false,
    //     timerProgressBar: true,
    //     background: "#fff",
    //     color: "#721c24",
    //     iconColor: "#f44336",
    //     didOpen: (toast) => {
    //       toast.addEventListener("mouseenter", Swal.stopTimer);
    //       toast.addEventListener("mouseleave", Swal.resumeTimer);
    //     },
    //     showClass: {
    //       popup: "animate__animated animate__fadeInDown",
    //     },
    //     hideClass: {
    //       popup: "animate__animated animate__fadeOutUp",
    //     },
    //   });
    //   return;
    // }

    // Create form data
    const formData = new FormData();
    formData.append("serviceId", product.serviceId);
    formData.append("brandId", product.brandId);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("titleAr", product.titleAr);
    formData.append("descriptionAr", product.descriptionAr);
    formData.append("purchaseType", product.purchaseType);
    if (product.subServiceId !== undefined && product.subServiceId !== null && product.subServiceId !== "") {
      formData.append("subServiceId", product.subServiceId);
    }
    
    // Convert array to JSON string for form submission
    if (Array.isArray(product.deliveryTypes)) {
      formData.append("deliveryTypes", product.deliveryTypes.join(","));
    } else {
      formData.append("deliveryTypes", JSON.stringify(product.deliveryTypes));
    }
   
     if (product.image) {
      formData.append("image", product.image);
    }


    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // Dispatch action
    try {
      const response = await dispatch(AddProductAction(formData)).unwrap();

 if (response.success) {
      toast.success(response.message);

      // Reset product fields to null
      // Reset product fields
 await setProduct({
    serviceId: '',
    brandId: '',
    title: '',
    description: '',
    titleAr: '',
    descriptionAr: '',
    purchaseType: '',
    deliveryTypes: [],
    subServiceId: '',
    image: null,
  });

      console.log("Product fields reset to null");
    } else {
      toast.error("Failed to add product");
    }
      console.log("Submitted Product Data:", response);
    } catch (error: any) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: error.message || "An unexpected error occurred.",
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#fff",
        color: "#721c24",
        iconColor: "#f44336",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  return (
    <>
      <Breadcrumb pageName="Product Section" />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl">
          <div className="rounded border bg-white shadow-md">
            <div className="border-b py-4 px-6">
              <h3 className="font-medium text-black">Product Section</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service ID */}
                <div>
                  <label className="block text-black">
                    Service ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="serviceId"
                    value={product.serviceId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">
                      {serviceLoading
                        ? "🔄 Loading services..."
                        : "Select a service"}
                    </option>

                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.serviceId && (
                    <p className="text-red-500 text-sm">{errors.serviceId}</p>
                  )}
                </div>

                {/* Brand ID */}
                <div>
                  <label className="block text-black">
                    Brand ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div
                      onClick={handleBrandDropdownClick}
                      className="w-full border rounded py-2 px-3 cursor-pointer"
                    >
                      {product.brandId
                        ? brands.find((brand) => brand.id === product.brandId)?.name
                        : ( brandLoading ?'🔄 Loading brands...': "Select a Brand")}
                    </div>
                    {isBrandDropdownOpen && (
                      <div className="absolute z-10 w-full mt-2 bg-white border rounded shadow-lg">
                        {/* Search Input */}
                        <input
                          type="text"
                          placeholder="Search brands..."
                          value={brandSearchTerm}
                          onChange={handleBrandSearchChange}
                          className="w-full border-b rounded-t py-2 px-3 focus:outline-none"
                        />
                        {/* Brand List */}
                        <div className="max-h-48 overflow-y-auto">
                          {filteredBrands.length > 0 ? (
                            filteredBrands.map((brand) => (
                              <div
                                key={brand.id}
                                onClick={() => handleBrandSelect(brand.id)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {brand.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">
                              No brands found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.brandId && (
                    <p className="text-red-500 text-sm">{errors.brandId}</p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="block text-black">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    placeholder="Enter product title"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-black">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* Title (Arabic) */}
                <div>
                  <label className="block text-black">Title (Arabic)</label>
                  <input
                    type="text"
                    name="titleAr"
                    value={product.titleAr}
                    onChange={handleInputChange}
                    placeholder="Enter product title in Arabic"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.titleAr && (
                    <p className="text-red-500 text-sm">{errors.titleAr}</p>
                  )}
                </div>

                {/* Description (Arabic) */}
                <div>
                  <label className="block text-black">
                    Description (Arabic)
                  </label>
                  <textarea
                    name="descriptionAr"
                    value={product.descriptionAr}
                    onChange={handleInputChange}
                    placeholder="Enter product description in Arabic"
                    className="w-full border rounded py-2 px-3"
                  />
                  {errors.descriptionAr && (
                    <p className="text-red-500 text-sm">
                      {errors.descriptionAr}
                    </p>
                  )}
                </div>

                {/* Purchase Type */}
                <div>
                  <label className="block text-black">
                    Purchase Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="purchaseType"
                    value={product.purchaseType}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    <option value="">Select purchase type</option>
                    {purchaseTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.purchaseType && (
                    <p className="text-red-500 text-sm">
                      {errors.purchaseType}
                    </p>
                  )}
                </div>

                {/* Delivery Type */}
                <div>
                  <label className="block text-black">
                    Delivery Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="deliveryTypes"
                    multiple
                    value={product.deliveryTypes}
                    onChange={handleDeliveryTypeChange}
                    className="w-full border rounded py-2 px-3"
                  >
                    {deliveryOptions.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.deliveryTypes && (
                    <p className="text-red-500 text-sm">
                      {errors.deliveryTypes}
                    </p>
                  )}
                </div>

                {/* Sub-Service ID */}
                <div>
                  <label className="block text-black">
                    SubService ID <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subServiceId"
                    value={product.subServiceId}
                    onChange={handleInputChange}
                    className="w-full border rounded py-2 px-3"
                  >
        
       
                      <option value="">  {subServiceLoading
                        ? "🔄 Loading sub-services..."
                        : "Select a sub-service"}</option>
                  
       
                   {   Subservices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))
                 }
                  </select>
                  {errors.subServiceId && (
                    <p className="text-red-500 text-sm">
                      {errors.subServiceId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-black">
                    Upload Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full border rounded py-2 px-3"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover"
                    />
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark"
                >
                  {loading ? (
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
