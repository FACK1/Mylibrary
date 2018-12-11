BEGIN;

DROP TABLE IF EXISTS users,books;
-- Table user
CREATE TABLE IF NOT EXISTS users (
    id          SERIAL        PRIMARY KEY,
    name        TEXT          NOT NULL,
    email       VARCHAR(200)  NOT NULL,
    password    VARCHAR(32)   NOT NULL
);

INSERT INTO users (name,email,password) VALUES ('samar','samar@gmail.com','samar123');

-- Table books
CREATE TABLE IF NOT EXISTS books (
    id          SERIAL     PRIMARY KEY,
    title       TEXT       NOT NULL,
    dis         TEXT       NOT NULL,
    rate        INTEGER  NOT NULL,
    user_id     INTEGER
);

INSERT INTO books (title,dis,rate,user_id) VALUES ('bookname','dis','7','1');


COMMIT;
