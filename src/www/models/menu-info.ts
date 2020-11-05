// ---------------- libraries ---------------
import { IMenuInfo, IMenuItemInfo, IMenuLevelInfo } from '@shared/models/interfaces/i-menu-info';
import { ModelBase } from '@models/abstracts/model-base';
// ---------------- libraries ---------------

export class MenuItemInfo extends ModelBase implements IMenuItemInfo {

  public text!: string;
  public key?: string;
  public parent?: string;
  public icon?: string;
  public action?: string;
  public items?: Array<MenuItemInfo>;
  public inSlide: boolean = false;
  public isOpen: boolean = false;

}

class MenuLevelInfo extends ModelBase implements IMenuLevelInfo {

  public level!: Array<MenuItemInfo>;

}


export class MenuInfo extends ModelBase implements IMenuInfo {

  public header!: Array<MenuItemInfo>;
  public menu!: MenuLevelInfo;

  constructor(obj: any = {}) {
    super();
    this.builder<MenuInfo>(obj);
  }

}