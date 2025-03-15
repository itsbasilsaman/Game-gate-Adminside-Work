// import React, { useState } from 'react';
// import { SellerProduct } from '../types/product';
// import ProductOne from '../../images/product/product-01.png';
// import ProductTwo from '../../images/product/product-02.png';
// import ProductThree from '../../images/product/product-03.png';
// import ProductFour from '../../images/product/product-04.png';
 
// import Modal from './Modal';
// import { Link } from 'react-router-dom';
// // import { useDispatch } from "react-redux";
// // import { AppDispatch, RootState } from "../../../reduxKit/store";
// // import { useSelector } from "react-redux";
// // import { Loading } from "../Loading";
// // import { getAllsellersAction } from "../../../reduxKit/actions/auth/seller/sellerAction";
// // import { SellerMain } from "../../../interfaces/admin/seller";
  

// const productData: SellerProduct[] = [
//   {
//     id: 1,
//     image: ProductOne,
//     name: 'Apple Watch Series 7',
//     country: 'India',
//     blocked: false,
//   },
//   {
//     id: 2,
//     image: ProductTwo,
//     name: 'Macbook Pro M1',
//     country: 'India',
//     blocked: false,
//   },
//   {
//     id: 3,
//     image: ProductThree,
//     name: 'Dell Inspiron 15',
//     country: 'India',
//     blocked: false,
//   },
//   {
//     id: 4,
//     image: ProductFour,
//     name: 'HP Probook 450',
//     country: 'India',
//     blocked: false,
//   },
// ];

// const SellerListSection =  React.memo(()=>{
//   const [products, setProducts] = useState<SellerProduct[]>(productData); // Manage products state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
//   //     const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
   
//   //     const [seller,setSellers]= useState<SellerMain[]>([])
//   //     const [sellerUser,setSellerUser]=useState({})

    
//   // const dispatch= useDispatch<AppDispatch>()
//   // const {loading}=useSelector((state:RootState)=> state.seller)
   
//   const handleDeleteClick = (id: number) => {
//     setSelectedProductId(id);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleDeleteConfirm = () => {
//     if (selectedProductId !== null) {
//       setProducts(products.filter(product => product.id !== selectedProductId)); // Remove from list
//     }
//     setIsModalOpen(false);
//   };

//   const toggleBlockStatus = (id: number) => {
//     setProducts(
//       products.map(product =>
//         product.id === id ? { ...product, blocked: !product.blocked } : product
//       )
//     );
//   };


//   // useEffect(()=>{
//   //   console.log("|||||||||||||||||||||||, ",seller, "dfjdksf", sellerUser);
    
  
//   // },[seller,sellerUser,selectedProductId])
  
  
//   // useEffect(() => {
//   //   const fetchSellers = async () => {
//   //     try {
//   //       const resultAction = await dispatch(getAllsellersAction());
//   //       if (getAllsellersAction.fulfilled.match(resultAction)) {
         
//   //         const sellersArray= resultAction.payload.result.data
//   //         setSellers(sellersArray)
//   //         setSellerUser(sellersArray.user)
  
//   //         console.log("sellers data fetched successfully: ", resultAction.payload.result.data);
    
//   //       } else {
//   //         console.log("Failed to fetch sellers: ", resultAction.payload || resultAction.error);
//   //       }
//   //     } catch (error) {
//   //       console.error("Unexpected error while fetching the seller: ", error);
//   //     }
//   //   };
  
//   //   fetchSellers();
//   // }, [dispatch]);

//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
//         <h4 className="text-xl font-semibold text-black dark:text-white">
//           Seller List
//         </h4>
//       </div>

//       <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
//         <div className="col-span-3 flex items-center">
//           <p className="font-medium">Username</p>
//         </div>
//         <div className="col-span-2 hidden items-center sm:flex">
//           <p className="font-medium">Country</p>
//         </div>
//         <div className="col-span-1 flex items-center">
//           <p className="font-medium">Edit</p>
//         </div>
//         <div className="col-span-1 flex items-center">
        
//         </div>
//       </div>

//       {products.map((product) => (
//         <div
//           className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
//           key={product.id}
//         >
//           <div className="col-span-3 flex items-center">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <div className="h-12.5 w-15 rounded-md">
//                 <img src={product.image} alt="Product" />
//               </div>
//               <p className="text-sm text-black dark:text-white">{product.name}</p>
//             </div>
//           </div>

//           <div className="col-span-2 hidden items-center sm:flex">
//             {product.country}
//           </div>

//           <div className="col-span-1 flex items-center">
//             <button
//               onClick={() => handleDeleteClick(product.id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               Delete
//             </button>
//           </div>

//           <div className="col-span-1 flex items-center">
//             <button
//               onClick={() => toggleBlockStatus(product.id)}
//               className={`px-4 py-2 rounded text-white ${
//                 product.blocked ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'
//               }`}
//             >
//               {product.blocked ? 'Block' : 'Unblock'}
//             </button>
//           </div>

//           <div className="col-span-1 flex items-center">
//              <Link to={'/sellerprofile'}><p className='underline text-[14px] hover:text-blue-900'>View More</p></Link>
//           </div>
//         </div>
//       ))}

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         onDelete={handleDeleteConfirm}
//         message="Are you sure you want to delete this service? This will also delete the related Sub Services."
//       />
//     </div>
//   );
// })

// export default SellerListSection;
