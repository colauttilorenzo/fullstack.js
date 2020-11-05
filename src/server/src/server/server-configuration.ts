import { Configuration } from '../bo/configuration';
import '../_shared/helpers/string-extension';
import '../_shared/helpers/object-extension';

export class ServerConfiguration {

    private static readonly DEVELOPMENT: string = 'development';
    private static readonly PRODUCTION: string = 'production';
    private static readonly DEV: string = 'dev';
    private static readonly PROD: string = 'prod';

    private environment: string = process.env.NODE_ENV || ServerConfiguration.DEVELOPMENT;
    private json = require('../environments/environment' + this.getEnvironemntConfiguration() + '');

    public getEnvironment(): string {
        switch (this.environment.toLowerCase()) {
            case ServerConfiguration.PRODUCTION:
            case ServerConfiguration.PROD:
                this.environment = ServerConfiguration.PRODUCTION;
                break;
            case ServerConfiguration.DEVELOPMENT:
            case ServerConfiguration.DEV:
                this.environment = ServerConfiguration.DEVELOPMENT;
                break;
            default:
                this.environment = this.environment.toLowerCase();
                break;
        }

        return this.environment;
    }

    private getEnvironemntConfiguration(): string {
        let env: string = this.getEnvironment();
        switch (env) {
            case ServerConfiguration.PRODUCTION:
                env = ServerConfiguration.PROD;
                env = '.${env}'.formatUnicorn({ env: env });
                break;
            case ServerConfiguration.DEVELOPMENT:
                env = '';
                break;
            default:
                env = '.${env}'.formatUnicorn({ env: env });
                break;
        }

        return env;
    }

    public get(): Configuration {
        let configuration = Object.cast(this.json.environment, Configuration);
        configuration.environment = this.environment;

        return configuration;
    }

}