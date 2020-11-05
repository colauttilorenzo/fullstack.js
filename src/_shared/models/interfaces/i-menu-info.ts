export interface IMenuItemInfo {

  text?: string;
  key?: string;
  parent?: string;
  icon?: string;
  action?: string;
  items?: Array<IMenuItemInfo>;
  inSlide: boolean;
  isOpen: boolean;

}

export interface IMenuLevelInfo {

  level?: Array<IMenuItemInfo>;

}

export interface IMenuInfo {

  header?: Array<IMenuItemInfo>;
  menu?: IMenuLevelInfo;

}