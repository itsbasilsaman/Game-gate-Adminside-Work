import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../reduxKit/store';
import { validateLevelForm } from "./validation";
import toast from "react-hot-toast";
import { AddLevelAction } from "../../../reduxKit/actions/auth/level/levelAction";
import { useDispatch } from "react-redux";

const LevelForm: React.FC = () => {
  const [level, setLevel] = useState<number>();
  const [requiredTransactionsUSD, setRequiredTransactionsUSD] = useState<number>();
  const [requiredTransactionsSR, setRequiredTransactionsSR] = useState<number>();
  const [errors, setErrors] = useState({
    level: "",
    requiredTransactionsUSD: "",
    requiredTransactionsSR: "",
  });

 
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { errors: validationErrors, hasError } = validateLevelForm(
      level,
      requiredTransactionsUSD,
      requiredTransactionsSR
    );
    setErrors(validationErrors);

    if (!hasError) {
      try {
        const formData = {
          level,
          requiredTransactionsUSD,
          requiredTransactionsSR,
        };

        console.log("Level data being sent:", formData);
        
        const response = await dispatch(AddLevelAction(formData)).unwrap()
        console.log('Response is ',response);
        
        // Assuming you have an action to handle this form submission
        // await dispatch(SomeAction(formData)).unwrap();
        toast.success(response.message);
        console.log("Level data submitted successfully:", formData);

        // Reset form fields
        setLevel(0);
        setRequiredTransactionsUSD(0);
        setRequiredTransactionsSR(0);
        setErrors({ level: "", requiredTransactionsUSD: "", requiredTransactionsSR: "" });
      } catch (error) {
        console.error("Error submitting level data:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Failed to submit level data. Please try again.",
        }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="rounded-sm border border-stroke bg-white shadow-default">
          <div className="border-b border-stroke py-4 px-6.5">
            <h3 className="font-medium text-black">Level Configuration</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="mb-2.5 block text-black">Level *</label>
                <input
                  type="number"
                  value={level}
                  onChange={(e) => {
                    setLevel(Number(e.target.value));
                    if (e.target.value)
                      setErrors((prev) => ({ ...prev, level: "" }));
                  }}
                  placeholder="Enter level"
                  className="w-full rounded border border-stroke py-3 px-5 text-black outline-none focus:border-primary"
                />
                {errors.level && (
                  <p className="text-red-500 text-sm">{errors.level}</p>
                )}
              </div>

              <div>
                <label className="mb-2.5 block text-black">
                  Required Transactions (USD) *
                </label>
                <input
                  type="number"
                  value={requiredTransactionsUSD}
                  onChange={(e) => {
                    setRequiredTransactionsUSD(Number(e.target.value));
                    if (e.target.value)
                      setErrors((prev) => ({ ...prev, requiredTransactionsUSD: "" }));
                  }}
                  placeholder="Enter required transactions in USD"
                  className="w-full rounded border border-stroke py-3 px-5 text-black outline-none focus:border-primary"
                />
                {errors.requiredTransactionsUSD && (
                  <p className="text-red-500 text-sm">{errors.requiredTransactionsUSD}</p>
                )}
              </div>

              <div>
                <label className="mb-2.5 block text-black">
                  Required Transactions (SR) *
                </label>
                <input
                  type="number"
                  value={requiredTransactionsSR}
                  onChange={(e) => {
                    setRequiredTransactionsSR(Number(e.target.value));
                    if (e.target.value)
                      setErrors((prev) => ({ ...prev, requiredTransactionsSR: "" }));
                  }}
                  placeholder="Enter required transactions in SR"
                  className="w-full rounded border border-stroke py-3 px-5 text-black outline-none focus:border-primary"
                />
                {errors.requiredTransactionsSR && (
                  <p className="text-red-500 text-sm">{errors.requiredTransactionsSR}</p>
                )}
              </div>
            </div>
            <div className="p-6.5">
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded hover:bg-primary-dark"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LevelForm;