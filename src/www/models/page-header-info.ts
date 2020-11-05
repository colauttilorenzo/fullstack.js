// ---------------- libraries ---------------
import { IPageHeaderInfo } from '@models/interfaces/i-page-header-info';
import { ModelBase } from "@models/abstracts/model-base";
// ---------------- libraries ---------------


export class PageHeaderInfo extends ModelBase implements IPageHeaderInfo {

  public title!: string;
  public description!: string;

  constructor(obj: any = {}) {
    super();
    this.builder<PageHeaderInfo>(obj);
  }

}