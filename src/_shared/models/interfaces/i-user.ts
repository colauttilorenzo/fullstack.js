import { ICompany } from "./i-company";

export interface IUser {

    id?: string;
    mail?: string;
    password?: string;
    firstname?: string;
    secondname?: string;
    companies?: Array<ICompany>;
    
}