import '@shared/helpers/object-extension'

export class ModelBase extends Object {

    public builder<T extends ModelBase>(obj: any): void {
        obj && Object.assign(this, obj);
    }

    public get isempty(): boolean {
        return Object.keys(this).length === 0;
    }

}