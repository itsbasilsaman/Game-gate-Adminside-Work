export const validateProductData = (product: {
  serviceId: string;
  brandId: string;
  title: string;
  description: string;
  titleAr: string;
  descriptionAr: string;
  purchaseType: string;
  deliveryTypes: string[];
  subServiceId: string;
  image: File | null;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Service ID validation (required)
  if (!product.serviceId) errors.serviceId = "Service ID is required.";

  // Brand ID validation (required)
  if (!product.brandId) errors.brandId = "Brand ID is required.";

  // Sub-Service ID validation (required)
if (!product.subServiceId) {
  errors.subServiceId = "Sub-Service ID is required.";
}

  // Title validation (required, min 3 chars)
  if (!product.title) errors.title = "Title is required.";
  else if (product.title.length < 3) errors.title = "Title must be at least 3 characters long.";

  // Description validation (required, min 10 chars)
  if (!product.description) errors.description = "Description is required.";
  else if (product.description.length < 10) errors.description = "Description must be at least 10 characters long.";

  // Title (Arabic) validation (required, min 3 chars)
  if (!product.titleAr) errors.titleAr = "Title (Arabic) is required.";
  else if (product.titleAr.length < 3) errors.titleAr = "Title (Arabic) must be at least 3 characters long.";

  // Description (Arabic) validation (required, min 10 chars)
  if (!product.descriptionAr) errors.descriptionAr = "Description (Arabic) is required.";
  else if (product.descriptionAr.length < 10) errors.descriptionAr = "Description (Arabic) must be at least 10 characters long.";

  // Purchase Type validation (required)
  if (!product.purchaseType) errors.purchaseType = "Purchase Type is required.";

  // // Delivery Type validation (must have at least one selection)
  // if (product.deliveryTypes.length === 0) {
  //   errors.deliveryTypes = "At least one delivery type is required.";
  // }

  // Image validation (required, must be JPEG/PNG, max size 5MB)
  if (!product.image) {
    errors.image = "An image is required.";
  } else if (!["image/jpeg", "image/png"].includes(product.image.type)) {
    errors.image = "Only JPEG and PNG images are allowed.";
  } else if (product.image.size > 5 * 1024 * 1024) {
    errors.image = "Image size must not exceed 5MB.";
  }

  return errors;
};
