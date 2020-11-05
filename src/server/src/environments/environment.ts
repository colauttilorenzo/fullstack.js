/**
 * default environment configuration module.
 * create environment.*.ts module to manage more environments (where * is the name of specific environment).
*/
export const environment: any = {
    production: false,
    databases: {
        app: {
            name: "app",
            auth: {
                username: "user",
                password: "user"
            },
            server: {
                host: "db",
                dialect: "mysql"
            },
            map: {
                config: "config",
                login: "logs",
                user: "users",
                _profile: "_PROFILE",
            }
        }
    },
    server: {
        http: {
            port: "8080",
            externalPort: "8080",
            protocol: "http"
        },
        hostname: "localhost"
    },
    api: "test/api"
};