// ---------------- libraries ---------------
import { IApplicationInfo } from '@shared/models/interfaces/i-application-info';
import { MenuInfo } from '@models/menu-info';
import { ModelBase } from "@models/abstracts/model-base";
// ---------------- libraries ---------------


export class ApplicationInfo extends ModelBase implements IApplicationInfo {

  public menu!: MenuInfo;
  public name!: string;
  public description!: string;
  public keydatastorage!: string;
  public version!: string;

  constructor(obj: any = {}) {
    super();
    this.builder<ApplicationInfo>(obj);
  }

}