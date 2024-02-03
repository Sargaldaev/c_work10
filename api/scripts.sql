DROP SCHEMA IF EXISTS newsDb;

CREATE SCHEMA newsDb;
USE newsDb;

create table news
(
    id       int auto_increment,
    title    varchar(200) not null,
    description  varchar(200) not null,
    image varchar(200),
    datetime datetime     default (CURRENT_TIMESTAMP),
    constraint news_pk
        primary key (id)
);

create table comments
(
    id      int auto_increment,
    author  varchar(100) default 'Anonymous' not null,
    description    varchar(400)              not null,
    newsId int                               not null,
    constraint comments_pk
        primary key (id),
    constraint comments_news_id_fk
        foreign key (newsId) references news (id)
            on update cascade on delete cascade
);


INSERT INTO news (title, description) VALUES ('News  ', 'lorems 100'),('News 2 ', 'lorems 100'),('News 3 ', 'lorems 100');
INSERT INTO comments (author, description, newsId) VALUES ('John', 'News good', 1),('Triss', 'News great', 2),('Bob ', 'News very good', 3);

