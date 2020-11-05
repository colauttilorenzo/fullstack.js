/**
 * HTTP verb used to expose actions over HTTP protocol.
 */
export enum HttpVerb {
    /**
     * used for search/retrieve.
     */
    GET,

    /**
     * used for insert new data.
     */
    POST,

    /**
     * used for update data.
     */
    PATCH,

    /**
     * used for delete data.
     */
    DELETE,

    /**
     * used for preflight XMLHttpRequest over cross-origin ([read more about CORS](https://developer.mozilla.org/it/docs/Web/HTTP/CORS)).
     */
    OPTIONS
}