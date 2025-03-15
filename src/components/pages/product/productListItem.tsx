/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetProductById } from "../../../reduxKit/actions/auth/product/productAction";
import { useParams } from "react-router-dom";

const ProductItem = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<any>(null); // State to hold the product data

  useEffect(() => {
    const getProductById = async () => {
      if(!id) return;
      try {
        const response = await dispatch(GetProductById(id));
        setProduct(response.payload); // Set the product data to state
      } catch (error) {
        console.error(error);
      }
    };
    
    getProductById();
  }, [dispatch, id]);

  if (!product) {
    return <div className="flex justify-center items-center  w-full h-full">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-900 rounded-full animate-spin"></div>
  </div>; // Show a loading state while data is being fetched
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Product Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
              <div
                className={`px-4 py-2 rounded text-white ${product.isActive ? "bg-green-500" : "bg-red-500"}`}
              >
                {product.isActive ? "Active" : "Inactive"}
              </div>
            </div>
            <h2 className="text-xl text-gray-700 mb-2">{product.titleAr}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">{product.descriptionAr}</p>
            <div className="flex space-x-2 mb-4">
              {product.deliveryTypes.map((type: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                >
                  {type}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Last updated: {new Date(product.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Brand Details */}
        {product.brand && (
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-2">Brand Details</h3>
              <div
                className={`px-4 py-1 rounded text-white ${product.brand.isActive ? "bg-green-500" : "bg-red-500"}`}
              >
                {product.brand.isActive ? "Active" : "Inactive"}
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={product.brand.image}
                alt={product.brand.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <p className="text-lg font-medium">{product.brand.name}</p>
                <p className="text-gray-600">{product.brand.nameAr}</p>
              </div>
            </div>
          </div>
        )}

        {/* Service Details */}
        {product.service && (
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-2">Service Details</h3>
              <div
                className={`px-4 py-1 rounded text-white ${product.service.isActive ? "bg-green-500" : "bg-red-500"}`}
              >
                {product.service.isActive ? "Active" : "Inactive"}
              </div>
            </div>
            <div className="flex items-center">
              <img
                src={product.service.iconUrl}
                alt={product.service.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div>
                <p className="text-lg font-medium">{product.service.name}</p>
                <p className="text-gray-600">{product.service.nameAr}</p>
              </div>
            </div>
          </div>
        )}

        {/* SubService Details */}
        {product.subService && (
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold mb-2">Sub Service Details</h3>
              <div
                className={`px-4 py-1 rounded text-white ${product.subService.isActive ? "bg-green-500" : "bg-red-500"}`}
              >
                {product.subService.isActive ? "Active" : "Inactive"}
              </div>
            </div>
            <div>
              <p className="text-lg font-medium">{product.subService.name}</p>
              <p className="text-gray-600">{product.subService.nameAr}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;