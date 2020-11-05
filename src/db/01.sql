CREATE SCHEMA IF NOT EXISTS `app`;
GRANT ALL ON `app`.* TO 'user'@'%';



CREATE TABLE IF NOT EXISTS app.config
(
    id                      VARCHAR(100) NOT NULL,
    dscr                    VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO app.config SELECT 'app-title', 'Application Test';

INSERT INTO app.config SELECT 'app-version', '1.0.000';



CREATE TABLE IF NOT EXISTS app.users
(
    id                      VARCHAR(64) NOT NULL,
    mail                    VARCHAR(100) NOT NULL,
    password                VARCHAR(32) NULL,
    profile_id              INTEGER NOT NULL,
    first_name              VARCHAR(100) NULL,
    second_name             VARCHAR(100) NULL,

    PRIMARY KEY (id)
);

INSERT INTO app.users SELECT 'fb75a926-97fc-4f4d-aff4-604b89e0d523', 'system@localhost', NULL, 1, 'administrator', NULL;

INSERT INTO app.users SELECT 'fb75a926-97fc-4f4d-aff4-604b89e0d524', 'test@localhost', '12345', 1, 'test', NULL;



CREATE TABLE IF NOT EXISTS app._profile
(
    id                      INTEGER NOT NULL,
    dscr                    VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

INSERT INTO app._profile SELECT 0, 'admin';

INSERT INTO app._profile SELECT 1, 'business';

INSERT INTO app._profile SELECT 2, 'user';

INSERT INTO app._profile SELECT -1, 'guest';



CREATE TABLE IF NOT EXISTS app.logs
(
    id                      VARCHAR(64) NOT NULL,
    user_id                 VARCHAR(64) NOT NULL,
    expired                 DATETIME NULL,

    primary key (id)
);

INSERT INTO app.logs SELECT 'b92a0256-f6b6-4e13-a4f4-25335cd44ea0', 'fb75a926-97fc-4f4d-aff4-604b89e0d523', NULL;
