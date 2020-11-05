import '../_shared/helpers/string-extension';

/** @ignore *//** */
class Database {
    public name?: string;
    public auth: Auth = new Auth();
    public server: DatabaseServer = new DatabaseServer();
}

class Auth {
    public username?: string;
    public password?: string;
}

class DatabaseServer {
    public host?: string;
    public dialect?: string;
    public map?: { [id: string]: string };
}

class Server {
    public hostname?: string;
    public http: Port = new Port();
    public ws: Port = new Port();
}

class Port {
    public protocol?: string;
    public port?: string;
    public externalPort?: string;
}

export class Configuration extends Object {
    public databases: { [id: string]: Database; } = {};
    public server: Server;
    public production?: boolean;
    public api?: string;
    public environment?: string;

    private readonly _API_PATTERN: string = '${module}/${action}';
    private readonly _API_URL_PATTERN: string = '${protocol}${hostname}${port}/${module}/${action}';

    private getHttpPort(isExternal: boolean = false): string {
        let port: string = '';
        let portProperty: string = (isExternal && this.server.http.externalPort ? 'externalPort' : 'port');
        let httpObject: any = this.server.http;

        if (typeof httpObject[portProperty] === 'string' && httpObject[portProperty].replace(/ /gm, '') !== '') {
            port = ':${port}'.formatUnicorn({ port: httpObject[portProperty] });
        }

        return port;
    }

    public constructor() {
        super();
        this.server = new Server();
        this.databases = {};
    }

    public getAction(action: string) {
        const api = this._API_PATTERN.formatUnicorn({
            module: this.api,
            action: action
        }).formatPath();

        return api;
    }

    public getUrlAction(action: string) {
        const api = this._API_URL_PATTERN.formatUnicorn({
            hostname: this.server.hostname,
            port: this.getHttpPort(true),
            module: this.api,
            action: action
        })
            .formatPath()
            .formatUnicorn({
                protocol: '${protocol}://'.formatUnicorn({ protocol: this.server.http.protocol })
            });

        return api;
    }
}