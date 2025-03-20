import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { GetAllOfferAction, UpdateStatusOfferAction } from "../../../reduxKit/actions/auth/offer/offerAction";
import Modal from "./statusModal";
 
 
interface Product {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  isActive: boolean;
  brand?: {
    name: string;
    nameAr: string;
    image: string;
    description: string;
    descriptionAr: string;
    isActive: boolean;
  };
  service?: {
    name: string;
    nameAr: string;
    iconUrl: string;
    isActive: boolean;
  };
  subService?: {
    name: string;
    nameAr: string;
  };
}

interface SelectedOffer {
  status?: string,
  adminNote?: string,
  id?: string;
}

interface Seller {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  userName: string;
  country: string;
  profileImage: string;
  isActive: boolean;
}


interface Offer {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  unitPriceUSD: number;
  minQty: number;
  deliveryMethods: (string | number)[];
  isActive: boolean;
  status: string;
  product: Product;
  seller: Seller;
}

const GetOffer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading , setLoading] = useState<boolean>(false)
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedOffer , setSelectedOffer] = useState<SelectedOffer | null>({})
  const [expandedProductIndex, setExpandedProductIndex] = useState<number | null>(null);
  const [update, updateStatus] = useState<boolean>(false);
 
  const [loadingButtons, setLoadingButtons] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getOffers = async () => {
      try {
        setLoading(true)
        const response = await dispatch(GetAllOfferAction());
        setOffers(response.payload.result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getOffers();
  }, [dispatch, update]);
 


  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleProductExpand = (index: number) => {
    setExpandedProductIndex(expandedProductIndex === index ? null : index);
  };

  const handleVerificationOffer = async (id: string) => {
    setLoadingButtons((prev) => ({ ...prev, [id]: true })); // Set loading for this button
  
    const offer = offers.find((o) => o.id === id);
    if (offer) {
      setSelectedOffer({
        status: offer.status,
        adminNote: "",  
        id: offer.id,
      });
    }
  
    setSelectedOfferId(id);
    setIsModalOpen(true);
  };
  

  const handleSaveStatus = async (status: string, adminNote: string) => {
    if (selectedOfferId) {
   
      const obj = {
        status:status,
        adminNote:adminNote,
        id: selectedOfferId,
      };
      setSelectedOffer(obj)
   
      try {
        await dispatch(UpdateStatusOfferAction(obj));
        updateStatus(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full p-4 bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
      <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Offer Lists
      </h4>

      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-dashed rounded-full border-blue-950 animate-spin"></div>
        </div>
      )}


      <div className="grid w-full grid-cols-1 gap-4">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg border-stroke dark:border-strokedark"
          >
            
            <div className="flex flex-col justify-between w-full gap-3 md:flex-row">
  
            <p className="text-sm text-gray-600">
            <h5 className="text-lg font-semibold"><span className="text-[18px] font-medium">  </span>{offer.title}</h5>
    
  </p>
  <div className="flex flex-col items-center gap-6 md:flex-row">
  <button
  onClick={() => handleVerificationOffer(offer.id)}
  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
  disabled={loadingButtons[offer.id]} // Disable the button while loading
>
  {loadingButtons[offer.id] ? (
    <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
  ) : (
    "Update Status"
  )}
</button>
    
    <p
      className={`text-sm font-semibold text-center lg:text-left ${
        offer.status == 'APPROVED' ? "text-green-600" : (offer.status == 'PENDING' ? 'text-orange-500' : "text-red-600")
      }`}
    >
      {offer.status}
    </p>
    
    <button
      onClick={() => toggleExpand(index)}
      className="flex items-center justify-center gap-1 text-blue-600 uppercase hover:text-blue-800"
    >
      <span className="text-[14px] font-medium">
        {expandedIndex === index ? "View Less" : "View Details"}
      </span> <FaEye />
    </button>
  </div>
</div>

            {expandedIndex === index && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
    <span className="text-[16px] font-medium text-black"> Arabic Title : </span>
     {offer.titleAr}
  </p>
  
                <div className="flex flex-col justify-between w-full my-3 md:flex-row">
                  <p className="text-sm"><span className="text-[16px] font-medium">Description : </span>{offer.description}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium ">Arabic Description : </span>{offer.descriptionAr}</p>
                </div>
                <div className="flex flex-col w-full gap-3 my-3">
                  <p className="text-sm"><span className="text-[16px] font-medium">Price : </span>${offer.unitPriceUSD}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium">Min. Quantity : </span>{offer.minQty}</p>
                </div>
                <div className="flex flex-col justify-between w-full my-3 md:flex-row">
                  <p className="text-sm">
                    <span className="text-[16px] font-medium">Delivery Methods : </span>{offer.deliveryMethods.join(", ")}
                  </p>
                  <div
                    className={`px-3 py-1 font-semibold ${
                      offer.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                  >
                    {offer.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                  <div className="w-full">
                    <h6 className="font-semibold text-center py-3 text-[20px]">
                      {offer.product ? "Product Details" : ""}
                    </h6>

                    {offer.product && (
                      <div
                        onClick={() => toggleProductExpand(index)}
                        className="p-5 mt-2 border rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center justify-center">
                          <img
                            src={offer.product.image}
                            alt={offer.product.title}
                            className="w-[300px] h-[300px] object-cover rounded-lg mb-4"
                          />
                        </div>
                        <p className="text-lg font-semibold text-center">
                          <span className="text-[18px] font-medium"> Title : </span>
                          {offer.product.title}
                        </p>
                        <p className="text-sm text-center text-gray-600">
                          <span className="text-[15px] font-medium">Arabic Title : </span>
                          {offer.product.titleAr}
                        </p>
                        <div
                          className={`flex justify-center font-semibold items-center px-2 py-1 my-3 text-[20px] ${
                            offer.product.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                        >
                          {offer.product.isActive ? "Active" : "Inactive"}
                        </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {expandedProductIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4">
                            {offer.product && (
                              <div className="flex flex-col justify-between w-full md:flex-row">
                                <p className="mt-2 text-sm">
                                  <span className="text-[15px] font-medium">Description : </span>
                                  {offer.product.description}
                                </p>
                                <p className="text-sm">
                                  <span className="text-[15px] font-medium">Description Arabic : </span>
                                  {offer.product.descriptionAr}
                                </p>
                              </div>
                            )}

                            {offer.product.brand && (
                              <div className="mt-4">
                                <h6 className="font-semibold text-center uppercase">Brand Details</h6>
                                <div className="p-4 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                  <div className="flex items-center justify-center gap-4">
                                    <img
                                      src={offer.product.brand.image}
                                      alt={offer.product.brand.name}
                                      className="w-[200px] h-[200px] object-cover rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <p className="py-2 text-lg font-semibold text-center">
                                      <span className="text-[15px] font-medium">Name : </span>
                                      {offer.product.brand.name}
                                    </p>
                                    <p className="text-sm text-center text-gray-600">
                                      <span className="text-[15px] font-medium">Arabic Name : </span>
                                      {offer.product.brand.nameAr}
                                    </p>
                                  </div>
                                  <div className="flex flex-col justify-between py-2 md:flex-row">
                                    <p className="mt-2 text-sm">
                                      <span className="text-[15px] font-medium">Description : </span>
                                      {offer.product.brand.description}
                                    </p>
                                    <p className="text-sm">
                                      <span className="text-[15px] font-medium">Description Arabic : </span>
                                      {offer.product.brand.descriptionAr}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {offer.product.service && (
                              <div className="mt-4">
                                <h6 className="pt-3 font-semibold text-center uppercase">Service Details</h6>
                                <div className="p-4 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                  <div className="flex items-center justify-center">
                                    {offer.product.service.iconUrl && (
                                      <img
                                        src={offer.product.service.iconUrl}
                                        alt={offer.product.service.name}
                                        className="w-[200px] h-[200px] object-cover rounded-md"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-lg font-semibold text-center">
                                      <span className="text-[15px] font-medium">Name : </span>
                                      {offer.product.service.name}
                                    </p>
                                    <p className="text-sm text-center text-gray-600">
                                      <span className="text-[15px] font-medium">Arabic Name : </span>
                                      {offer.product.service.nameAr}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {offer.product.subService && (
                              <div className="mt-4">
                                <h6 className="pt-3 font-semibold text-center uppercase">Sub Service Details</h6>
                                <div className="p-4 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700">
                                  <p className="text-lg font-semibold">
                                    <span className="text-[15px] font-medium">Name : </span>
                                    {offer.product.subService.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <span className="text-[15px] font-medium">Arabic Name : </span>
                                    {offer.product.subService.nameAr}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="w-full">
                  <h6 className="font-semibold text-center py-3 text-[20px]">Seller Details</h6>
                  <div className="p-5 mt-2 border rounded-lg">
                    <div className="flex justify-center items-center gap-[15px]">
                      <img
                        src={offer.seller.profileImage}
                        alt={offer.seller.firstName}
                        className="object-cover w-16 h-16 mb-2 rounded-full"
                      />
                      <div>
                        <p className="text-lg font-semibold">{offer.seller.firstName} {offer.seller.lastName}</p>
                        <p className="text-sm text-gray-600">{offer.seller.userName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between w-full md:flex-row">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm"><span className="mr-2 font-medium">Phone :</span>{offer.seller.phoneNumber}</p>
                        <p className="text-sm"><span className="mr-2 font-medium">Gender :</span>{offer.seller.gender}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm"><span className="mr-2 font-medium">Email :</span>{offer.seller.email}</p>
                        <p className="text-sm"><span className="mr-2 font-medium">Country :</span>{offer.seller.country}</p>
                      </div>
                    </div>
                    <div
                      className={`flex justify-center font-semibold items-center px-2 py-1 my-3 text-[20px] ${
                        offer.seller.isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {offer.seller.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    if (selectedOfferId) {
      setLoadingButtons((prev) => ({ ...prev, [selectedOfferId]: false })); // Reset loading for this button
    }
  }}
  onSave={handleSaveStatus}
  initialStatus={selectedOffer?.status || ""}
  initialAdminNote={selectedOffer?.adminNote || ""}
/>
    </div>
  );
};

export default GetOffer;