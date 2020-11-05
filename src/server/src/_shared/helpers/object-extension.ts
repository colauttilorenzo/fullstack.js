interface Object {
    /**
     * cast any json into T.
     * @param raw   json to cast.
     * @param type  type of new object.
     * @returns new object.
     */
    cast<T extends Object>(raw: any, type: new () => T): T;
}

Object.cast = function <T extends Object>(raw: any, type: new () => T): T {
    const obj = new type();
    Object.keys(raw).forEach(k => (obj as any)[k] = raw[k]);

    return obj;
}