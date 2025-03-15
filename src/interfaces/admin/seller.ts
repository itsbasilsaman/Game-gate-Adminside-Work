
export  interface sellerUser {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    gender: string;
    profileImage: string | null;
    userName: string;
    coverImage: string | null;
    country: string;
    countryCode: string;
    totalTransaction: number;
    successfulDeliveries: number;
    languages: string[];
    description: string | null;
    onlineStatus: boolean;
    memberSince: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    accountId: string;
    lastLogin: string;
    fcmToken: string;
    levelId: string;
    addressId: string | null;
    isActive:boolean;
  }
  
 export interface SellerMain {
    id: string;
    userId: string;
    successfulDeliveryPct: number;
    addressId: string;
    verificationStatus: string;
    adminNote: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
    dob: string;
    user: sellerUser;
  }