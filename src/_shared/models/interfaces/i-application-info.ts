import { IMenuInfo } from "./i-menu-info";

export interface IApplicationInfo {

  menu?: IMenuInfo;
  name?: string;
  description?: string;
  keydatastorage?: string;
  version?: string;

}