import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (status: string, adminNote: string) => void;
  initialStatus?: string;
  initialAdminNote?: string;
}

const Modal = ({ isOpen, onClose, onSave, initialStatus = "", initialAdminNote = "" }: ModalProps) => {
  const [status, setStatus] = useState<string>(initialStatus);
  const [adminNote, setAdminNote] = useState<string>(initialAdminNote);
  const [statusError, setStatusError] = useState<boolean>(false);
  const [noteError, setNoteError] = useState<boolean>(false);
  

  // Ensure state updates when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      console.log("Modal opened. Setting initial values:", initialStatus, initialAdminNote);
      setStatus(initialStatus);
      setAdminNote(initialAdminNote);
    }
  }, [isOpen, initialStatus, initialAdminNote]);

  const handleSave = () => {
    if (!status) {
      setStatusError(true);
      return;
    }

    if (!adminNote) {
      setNoteError(true);
      return;
    }

    onSave(status, adminNote);
    onClose();
    toast[status === "APPROVED" ? "success" : "error"](`User Status ${status}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="w-full max-w-md p-6 bg-white rounded-lg dark:bg-boxdark"
          >
            <h2 className="mb-4 text-xl font-semibold">Update Offer Status</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Status</label>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setStatus("APPROVED");
                    setStatusError(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    status === "APPROVED" ? "bg-green-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => {
                    setStatus("REJECTED");
                    setStatusError(false);
                  }}
                  className={`px-4 py-2 rounded ${
                    status === "REJECTED" ? "bg-red-500 text-white" : "bg-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
              {statusError && <p className="text-red-700">Please select a status</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Admin Note</label>
              <textarea
                value={adminNote}
                onChange={(e) => {
                  setAdminNote(e.target.value);
                  setNoteError(false);
                }}
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Enter admin note..."
              />
              {noteError && <p className="text-red-700">Please enter a note</p>}
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-white bg-blue-500 rounded">
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
