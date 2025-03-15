interface LevelFormErrors {
  level: string;
  requiredTransactionsUSD: string;
  requiredTransactionsSR: string;
}

export const validateLevelForm = (
  level: number | undefined,
  requiredTransactionsUSD: number | undefined,
  requiredTransactionsSR: number | undefined
): { errors: LevelFormErrors; hasError: boolean } => {
  const errors: LevelFormErrors = {
    level: "",
    requiredTransactionsUSD: "",
    requiredTransactionsSR: "",
  };

  let hasError = false;

  if (!level || level < 1) {
    errors.level = "Level must be at least 1.";
    hasError = true;
  }

  if (!requiredTransactionsUSD || requiredTransactionsUSD < 0) {
    errors.requiredTransactionsUSD = "Please Enter Required transactions in USD.";
    hasError = true;
  }

  if (!requiredTransactionsSR || requiredTransactionsSR < 0) {
    errors.requiredTransactionsSR = "Please Enter Required transactions in SR.";
    hasError = true;
  }

  return { errors, hasError };
};