create database if not exists masterdle;
use masterdle;

drop table if exists User;

create table if not exists User(
	uuid varchar(60) primary key,
    user_name varchar(15) not null,
    user_passwrd varchar(60) not null,
    user_role varchar(10) default "user"
);