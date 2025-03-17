import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { GetProductAction } from '../../../reduxKit/actions/auth/product/productAction';
import { AppDispatch, RootState } from '../../../reduxKit/store';
import { Link } from 'react-router-dom';

interface Product {
  id:string
  image: string;
  isActive:boolean;
  title:string;
  titleAr:string;
}

const ProductListSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product[]>([]);
 
  

  const { loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    const getProductList = async () => {
      try {
        const resultAction = await dispatch(GetProductAction());
        setProduct(resultAction.payload.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductList();
  }, [dispatch]);

  

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">Product List</h4>
      </div>

   <div>
        {/* Table Layout for Larger Screens */}
        <div className="hidden md:block">
          {/* Header Row */}
          <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Image</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Title</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Title (Arabic)</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Status</p>
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <p className="font-medium">Details</p>
            </div>
          </div>
          
      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}
  
          {/* Product Rows */}
          {product.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:grid-cols-8 md:px-6 2xl:px-7.5">
                {/* Image */}
                <div className="col-span-2 flex items-center">
                  <img src={item.image} alt={item.title} className="h-12 w-12 object-cover rounded-md" />
                </div>
  
                {/* Title */}
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">{item.title}</p>
                </div>
  
                {/* Title (Arabic) */}
                <div className="col-span-2 flex items-center">
                  <p className="text-sm text-black dark:text-white">{item.titleAr}</p>
                </div>
  
                {/* Active/Inactive Button */}
                <div className="col-span-1 flex items-center">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      item.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
  
                {/* View Details Button */}
                <div className="col-span-1 flex items-center justify-end">
                 <Link to={`/productList/${item.id}`}>
                    <button
                     
                      className="text-sm   p-1 rounded-md text-blue-900 font-bold"
                    >
                      View Details
                    </button>
                 </Link>
                </div>
              </div>
  
               
            </div>
          ))}
        </div>
  
        {/* Card Layout for Mobile Screens */}
        <div className="block md:hidden">
          {product.map((item) => (
            <div key={item.id} className="border-t border-stroke py-4 px-4 dark:border-strokedark">
              <div className="flex flex-col space-y-4">
                {/* Image and Title */}
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded-md" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.titleAr}</p>
                  </div>
                </div>
  
                {/* Status and View Details Button */}
                <div className="flex justify-between items-center">
                  <button
                    className={`px-3 py-1 text-sm rounded-md ${
                      item.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                  <Link to={`/productList/${item.id}`}>
                    <button
                      
                      className="text-sm   p-1 rounded-md text-blue-900 font-bold"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
  
                 
              </div>
            </div>
          ))}
        </div>
   </div>
    </div>
  );
};

export default ProductListSection;