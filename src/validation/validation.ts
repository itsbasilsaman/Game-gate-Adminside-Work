// Brand Validation
export const validateBrandData = (
  brand: string,
  description: string,
  image: File | null
) => {
  const errors: { brand: string; description: string; image: string } = {
    brand: '',
    description: '',
    image: '',
  };
  let hasError = false;

  // Validate brand
  if (!brand) {
    errors.brand = 'Brand is required';
    hasError = true;
  }

  // Validate description
  if (!description) {
    errors.description = 'Description is required';
    hasError = true;
  }

  // Validate image
  if (!image) {
    errors.image = 'Image is required';
    hasError = true;
  }

  return { errors, hasError };
};

// AddService Validation
export const validateServiceAndImage = (
  name: string,
  nameAr: string,
  icon: File | null
) => {
  const errors: { name: string; icon: string; nameAr: string } = {
    name: '',
    icon: '',
    nameAr: '',
  };
  let hasError = false;

  // Validate service
  if (!nameAr) {
    errors.nameAr = 'Service Arabic is required';
    hasError = true;
  }
  if (!name) {
    errors.name = 'Service is required';
    hasError = true;
  }

  // Validate icon
  if (!icon) {
    errors.icon = 'Image is required';
    hasError = true;
  }

  return { errors, hasError };
};


// validation.ts

export interface Option {
brandId: string;
regionIds: string[];
}

export interface FormState {
subService: string;
name: string;
nameAr: string;
description: string;
descriptionAr: string;
purchaseType: string;
options: Option[];
}

// Define the errors for each field in the form
export interface FormErrors {
subService?: string;
name?: string;
nameAr?: string;
description?: string;
descriptionAr?: string;
purchaseType?: string;
}

export const validateSubService = (formState: FormState) => {
const errors: FormErrors = {};
let hasError = false;

// Validate SubService
if (!formState.subService.trim()) {
  errors.subService = "Sub Service is required";
  hasError = true;
}

// Validate Name
if (!formState.name.trim()) {
  errors.name = "Name is required";
  hasError = true;
}

// Validate Arabic Name
if (!formState.nameAr.trim()) {
  errors.nameAr = "Arabic Name is required";
  hasError = true;
}

// Validate Description
if (!formState.description.trim()) {
  errors.description = "Description is required";
  hasError = true;
}

// Validate Arabic Description
if (!formState.descriptionAr.trim()) {
  errors.descriptionAr = "Arabic Description is required";
  hasError = true;
}

// Validate Purchase Type
if (!formState.purchaseType.trim()) {
  errors.purchaseType = "Purchase Type is required";
  hasError = true;
}

return { errors, hasError };
};





// ****************************************************//

//Product Validation

