// Brand Validation
export const validateBrandData = (
  name: string,
  nameAr: string,
  description: string,
  descriptionAr: string,
  image: File | null,
) => {
  const errors: { name: string; nameAr: string; description: string; descriptionAr: string; image: string } = {
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    image: '',
  };
  let hasError = false;

  // Validate name
  if (!name) {
    errors.name = 'Name is required';
    hasError = true;
  }

  // Validate nameAr
  if (!nameAr) {
    errors.nameAr = 'NameAr is required';
    hasError = true;
  }

  // Validate description
  if (!description) {
    errors.description = 'Description is required';
    hasError = true;
  }

  // Validate descriptionAr
  if (!descriptionAr) {
    errors.descriptionAr = 'DescriptionAr is required';
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
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  // purchaseType: string;
  // options: Option[];
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
 

  return { errors, hasError };
};


export const validateRegionAndImage = (name: string, nameAr: string, icon: File | null) => {
  const errors = {
    name: '',
    nameAr: '',
    icon: '',
  };
  let hasError = false;

  if (!name.trim()) {
    errors.name = 'Region name is required';
    hasError = true;
  }

  if (!nameAr.trim()) {
    errors.nameAr = 'Arabic region name is required';
    hasError = true;
  }

  if (!icon) {
    errors.icon = 'Icon image is required';
    hasError = true;
  } else if (icon.size > 5 * 1024 * 1024) {
    errors.icon = 'Image size exceeds 5MB';
    hasError = true;
  }

  return { errors, hasError };
}
