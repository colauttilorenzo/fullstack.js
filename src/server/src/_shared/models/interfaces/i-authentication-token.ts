import { IUser } from "./i-user";

export interface IAuthenticationToken {

    isLogged: boolean;
    id?: string;
    expired?: Date;
    user?: IUser;
    
}