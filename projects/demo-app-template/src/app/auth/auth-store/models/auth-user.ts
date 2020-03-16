export interface IAuthUser{
    email:string;
    name:string;
    lastName?:string;
}

export interface ILocalStorageAuth {
    isAuthenticated: boolean; 
    user:IAuthUser;
}