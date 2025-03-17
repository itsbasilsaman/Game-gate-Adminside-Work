import React, { useState } from "react";
import { Switch } from "@headlessui/react";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: string, rejectionReason?: string) => void;
  userId: string;
}
const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose, onSubmit, userId }) => {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [error, setError] = useState<string>('')

  const handleSubmit = () => {
    if (!isAccepted && !rejectionReason) {
      setError("Please provide a reason for rejection.");
      return;
    } 
    setError('')
    onSubmit(isAccepted ? "ACCEPT" : "REJECT", rejectionReason);
    onClose();
  };

  console.log(userId);
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Verify Seller</h2>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Reject</span>
          <Switch
            checked={isAccepted}
            onChange={setIsAccepted}
            className={`${
              isAccepted ? "bg-green-500" : "bg-red-500"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-all`}
          >
            <span
              className={`${
                isAccepted ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform bg-white rounded-full transition-all`}
            />
          </Switch>
          <span className="text-gray-700">Accept</span>
        </div>
        {!isAccepted && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Rejection Reason:</label>
            <textarea
              className="w-full p-2 border rounded resize-none"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <p className="text-[15px] text-red-700">{error}</p>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;