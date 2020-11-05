import express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { HttpVerb } from '../bo/http-verb';
import { ServerConfiguration } from '../server/server-configuration';
import { Configuration } from '../bo/configuration';

import '../_shared/helpers/string-extension';
const cors = require('cors');

export class Server {

    private static app: express.Application = express();
    private static config: Configuration = new ServerConfiguration().get();

    private static __dirnameBuild: string = './dist/www';

    public static readonly cors: any = cors();

    public static SERVER_CONFIGURATION() {

        Server.app.use(Server.cors);
        Server.app.options('*', Server.cors);

        Server.app.use(bodyParser.json());

        Server.app.use(express.static(Server.__dirnameBuild));
        Server.app.all(/^(?!.*(api)).*/gm, (req, res) => {
            res.status(200).sendFile('/', { root: Server.__dirnameBuild });
        });
    }

    public static start(): void {

        //initialising server
        const httpPort: string | undefined = Server.config.server.http.port;
        if (httpPort == undefined) {
            throw 'Porta non impostata. Impostare la porta su cui esporre i servizi nel file di configurazione.';
        }

        Server.app.listen(Number.parseInt(httpPort), async function () {

            console.log('LISTENING ON ${hostname}:${port}'.formatUnicorn({ port: httpPort, hostname: Server.config.server.hostname }));

            console.log('\nENVIRONMENT    -> ${env}'.formatUnicorn({ env: Server.config.environment?.toUpperCase() }));
            console.log('BASE URL API   -> ${url}'.formatUnicorn({ url: Server.config.getUrlAction('') }));

        });

    }

    public static register(handler: express.RequestHandler, httpverb: HttpVerb, action: string) {

        action = '/' + this.config.getAction(action === '' ? handler.name : action);

        switch (httpverb) {

            case HttpVerb.GET:
                Server.app.get(action, Server.cors, handler);
                break;

            case HttpVerb.POST:
                Server.app.post(action, Server.cors, handler);
                break;

            case HttpVerb.PATCH:
                Server.app.patch(action, Server.cors, handler);
                break;

            case HttpVerb.DELETE:
                Server.app.delete(action, Server.cors, handler);
                break;

            case HttpVerb.OPTIONS:
                Server.app.options(action, Server.cors, handler);
                break;

            default:
                break;
        }

        let strVerb = HttpVerb[httpverb];
        console.log('[ api: ${httpverb} ] ${action}'.formatUnicorn({ httpverb: strVerb.padEnd(4, ' '), action: action }));
    }

}