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
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
 

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
    setIsButtonLoading(true)
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
    setIsButtonLoading(false)
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
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 w-full">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
        Offer Lists
      </h4>

      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}


      <div className="grid grid-cols-1 gap-4 w-full">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="border border-stroke dark:border-strokedark p-4 rounded-lg"
          >
            
            <div className="w-full flex flex-col md:flex-row justify-between gap-3">
  
            <p className="text-sm text-gray-600">
            <h5 className="text-lg font-semibold"><span className="text-[18px] font-medium">  </span>{offer.title}</h5>
    
  </p>
  <div className="flex flex-col md:flex-row gap-6 items-center">
    <button
      onClick={() => handleVerificationOffer(offer?.id)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      {isButtonLoading ? (
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

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
      className="text-blue-600 hover:text-blue-800 flex justify-center items-center uppercase gap-1"
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
  
                <div className="flex flex-col md:flex-row w-full justify-between my-3">
                  <p className="text-sm"><span className="text-[16px] font-medium">Description : </span>{offer.description}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium ">Arabic Description : </span>{offer.descriptionAr}</p>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-between my-3">
                  <p className="text-sm"><span className="text-[16px] font-medium">Price : </span>${offer.unitPriceUSD}</p>
                  <p className="text-sm"><span className="text-[16px] font-medium">Min. Quantity : </span>{offer.minQty}</p>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-between my-3">
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

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full">
                    <h6 className="font-semibold text-center py-3 text-[20px]">
                      {offer.product ? "Product Details" : ""}
                    </h6>

                    {offer.product && (
                      <div
                        onClick={() => toggleProductExpand(index)}
                        className="cursor-pointer border p-5 rounded-lg mt-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <div className="flex justify-center items-center">
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
                        <p className="text-sm text-gray-600 text-center">
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
                              <div className="w-full flex flex-col md:flex-row justify-between">
                                <p className="text-sm mt-2">
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
                                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
                                  <div className="flex items-center gap-4 justify-center">
                                    <img
                                      src={offer.product.brand.image}
                                      alt={offer.product.brand.name}
                                      className="w-[200px] h-[200px] object-cover rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <p className="text-lg font-semibold text-center py-2">
                                      <span className="text-[15px] font-medium">Name : </span>
                                      {offer.product.brand.name}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center">
                                      <span className="text-[15px] font-medium">Arabic Name : </span>
                                      {offer.product.brand.nameAr}
                                    </p>
                                  </div>
                                  <div className="flex flex-col md:flex-row justify-between py-2">
                                    <p className="text-sm mt-2">
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
                                <h6 className="font-semibold text-center uppercase pt-3">Service Details</h6>
                                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
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
                                    <p className="text-sm text-gray-600 text-center">
                                      <span className="text-[15px] font-medium">Arabic Name : </span>
                                      {offer.product.service.nameAr}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {offer.product.subService && (
                              <div className="mt-4">
                                <h6 className="font-semibold text-center uppercase pt-3">Sub Service Details</h6>
                                <div className="border p-4 rounded-lg mt-2 bg-gray-50 dark:bg-gray-700">
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
                  <div className="border p-5 rounded-lg mt-2">
                    <div className="flex justify-center items-center gap-[15px]">
                      <img
                        src={offer.seller.profileImage}
                        alt={offer.seller.firstName}
                        className="w-16 h-16 rounded-full object-cover mb-2"
                      />
                      <div>
                        <p className="text-lg font-semibold">{offer.seller.firstName} {offer.seller.lastName}</p>
                        <p className="text-sm text-gray-600">{offer.seller.userName}</p>
                      </div>
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center">
                      <div className="flex flex-col gap-2">
                        <p className="text-sm"><span className="font-medium mr-2">Phone :</span>{offer.seller.phoneNumber}</p>
                        <p className="text-sm"><span className="font-medium mr-2">Gender :</span>{offer.seller.gender}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm"><span className="font-medium mr-2">Email :</span>{offer.seller.email}</p>
                        <p className="text-sm"><span className="font-medium mr-2">Country :</span>{offer.seller.country}</p>
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
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStatus}
        initialStatus ={selectedOffer?.status || ""}
        initialAdminNote={selectedOffer?.adminNote || ""}
      />
    </div>
  );
};

export default GetOffer;