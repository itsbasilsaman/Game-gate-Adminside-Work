export interface IAdminLogin{
    email:string|null;
    password?:string|null;
    role?:string;
    fcmToken?:string|null    
}