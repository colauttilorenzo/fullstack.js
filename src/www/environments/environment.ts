import { Configuration } from "@models/configuration";

export const environment = new Configuration({
    production: false,
    baseapi: './assets/api/',
    actionext: 'json',
    keydatastorage: 'appkey'
});