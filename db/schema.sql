CREATE TABLE denormalized30m (
    review_id           serial primary key,
    game_id             integer,
    user_id             bigint,
    username            varchar(100),
    user_avatar         varchar(100),
    product_count       integer,
    review_count        integer,
    recommended         boolean,
    review_date         varchar(75),
    hours_played        integer,
    content             text,
    language            varchar(10),
    helpful_yes_count   integer,
    helpful_funny_count integer
);