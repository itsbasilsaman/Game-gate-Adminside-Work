import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { getAllsellersAction, getSellerByIdAction, UpdateVerificationSellerAction } from "../../../reduxKit/actions/auth/seller/sellerAction";
import { SellerMain } from "../../../interfaces/admin/seller";
import VerificationModal from "./verificationModal";

const SellerList = React.memo(() => {
  const [sellers, setSellers] = useState<SellerMain[]>([]);
  const [sellerDetails, setSellerDetails] = useState<SellerMain | null>(null);
  const [expandedSellerId, setExpandedSellerId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loadingSellerId, setLoadingSellerId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.seller);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const resultAction = await dispatch(getAllsellersAction());
        if (getAllsellersAction.fulfilled.match(resultAction)) {
          const sellersArray = resultAction.payload.result.data;
          setSellers(sellersArray);
          console.log("Sellers data fetched successfully: ", sellersArray);
        } else {
          console.log("Failed to fetch sellers: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching the seller: ", error);
      }
    };

    fetchSellers();
  }, [dispatch]);

  const handleViewDetails = async (id: string) => {
    if (expandedSellerId === id) {
      setExpandedSellerId(null);
      setSellerDetails(null);
    } else {
      try {
        const resultAction = await dispatch(getSellerByIdAction(id));
        if (getSellerByIdAction.fulfilled.match(resultAction)) {
          const sellerData = resultAction.payload?.data;
          if (sellerData) {
            setSellerDetails(sellerData);
            setExpandedSellerId(id);
          } else {
            console.error("Seller data is missing in the response:", resultAction.payload);
          }
        } else {
          console.log("Failed to fetch seller details: ", resultAction.payload || resultAction.error);
        }
      } catch (error) {
        console.error("Unexpected error while fetching the seller details: ", error);
      }
    }
  };

 const handleVerification = async (action: string, rejectionReason?: string) => {
  if (selectedUserId) {
    setLoadingSellerId(selectedUserId); // Start loading state
    try {
      const resultAction = await dispatch(
        UpdateVerificationSellerAction({
          userId: selectedUserId,
          action,
          rejectionReason,
        })
      );

      if (UpdateVerificationSellerAction.fulfilled.match(resultAction)) {
        console.log("Verification status updated successfully:", resultAction.payload);
        // Update the seller list with new status
        const updatedSellers = sellers.map((seller) =>
          seller.userId === selectedUserId
            ? { ...seller, verificationStatus: action === "ACCEPT" ? "APPROVED" : "REJECTED" }
            : seller
        );
        setSellers(updatedSellers);
      } else {
        console.log("Failed to update verification status: ", resultAction.payload || resultAction.error);
      }
    } catch (error) {
      console.error("Unexpected error while updating verification status: ", error);
    } finally {
      setLoadingSellerId(null); // Reset loading state
    }
  }
};

 

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          SellerList
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Profile Image</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Username</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium"> </p>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4 h-[60vh] w-full">
          <div className="w-8 h-8 border-4 border-blue-950 border-dashed rounded-full animate-spin"></div>
        </div>
      )}


      {sellers.map((seller) => (
        <div key={seller.userId}>
          <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <div className="h-15 w-15 rounded-md">
               { seller.user.profileImage ? <img
                  src={seller.user.profileImage ?? "https://via.placeholder.com/150"}
                  alt="Profile Image"
                  className="h-full w-full object-cover rounded-full"
                /> :
                <div className="h-15 w-15 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600">N/A</span>
              </div>
                }
              </div>
            </div>
            <div className="col-span-2 flex items-center">
              <p>{seller.user.userName}</p>
            </div>
            <div className="col-span-2 flex items-center gap-4">
            <button
  className={`px-6 py-2 rounded-full text-white flex items-center justify-center ${
    seller.verificationStatus === "PENDING"
      ? "bg-orange-500"
      : seller.verificationStatus === "APPROVED"
      ? "bg-green-500"
      : "bg-red-500"
  }`}
  disabled={loadingSellerId === seller.userId} // Disable button while loading
>
  {loadingSellerId === seller.userId ? (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    seller.verificationStatus
  )}
</button>

            </div>
            <div className="col-span-2 flex items-center">
              <button
                className="ml-4 text-blue-500 hover:text-blue-700"
                onClick={() => handleViewDetails(seller.userId)}
              >
                {expandedSellerId === seller.userId ? 'Hide Details' : 'View Details'}
              </button>
             
            </div>
          </div>

          {expandedSellerId === seller.userId && sellerDetails && (
            <div className="border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:px-6 2xl:px-7.5 flex  justify-between">
              <div>
                <h4 className="text-[22px] font-bold text-black dark:text-white text-center">Seller Details</h4>
                <p><strong>Country </strong> {sellerDetails.user.country || "N/A"}</p>
                <p><strong>Description </strong> {sellerDetails.user.description || "N/A"}</p>
                <p><strong>Email </strong> {sellerDetails.user.email}</p>
                <p><strong>First Name </strong> {sellerDetails.user.firstName}</p>
                <p><strong>Last Name </strong> {sellerDetails.user.lastName}</p>
                <p><strong>Gender </strong> {sellerDetails.user.gender}</p>
                <p><strong>Member Since </strong> {new Date(sellerDetails.user.memberSince).toLocaleDateString()}</p>
                <p><strong>Phone Number </strong> {sellerDetails.user.phoneNumber}</p>
              </div>
              <button
                className="ml-4  text-[18px] font-medium text-blue-900 "
                onClick={() => {
                  setSelectedUserId(seller.userId);
                  setIsModalOpen(true);
                }}
              >
                Verify Seller
              </button>
            </div>
          )}
        </div>
      ))}

      <VerificationModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleVerification}
        userId={selectedUserId || ""}
      />
    </div>
  );
});

export default SellerList;