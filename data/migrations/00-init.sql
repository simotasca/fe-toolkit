create schema if not exists auth;

create table auth.user (
  id         uuid primary key not null default gen_random_uuid(),
  email      varchar(255) unique not null,
  password   varchar(255) not null,
  username   varchar(100) unique not null,
  role       varchar(20) not null default 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);