interface String {
    /**
     * string format (.NET like) e.g. "hello {0}! I'm {1}.".format('world', 'back').
     * @param replacements   dynamic list of values to replace with.
     * @returns computed string with replacements.
     */
    format(...replacements: string[]): string;

    /**
     * string format e.g. "hello ${world}! I'm ${back}.".format({ world: 'world', back: 'back' }).
     * @param param   dictionary of values to replace with.
     * @returns computed string with replacements.
     */
    formatUnicorn(param: { [id: string]: string | undefined }): string;

    /**
     * string format e.g. "test//api//test".formatPath(); => "test/api/test".
     * @returns computed string with valid path.
     */
    formatPath(): string;
}

String.prototype.format = function (): string {
    const args = arguments;
    return this.replace(/{(\d+)}/gm, function (match, number) {
        return ((typeof args[number] != 'undefined' && typeof args[number] == 'string') ? args[number] : match);
    });
};

String.prototype.formatUnicorn = function (param: { [id: string]: string | undefined }): string {
    let str: string = this.toString();
    for (let key in param) {
        str = str.split('${' + key + '}').join(param[key]?.toString());
    }
    return str;
}

String.prototype.formatPath = function (): string {
    return this.replace(/\/{1,}/gm, '/');
}