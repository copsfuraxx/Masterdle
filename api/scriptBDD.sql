create database if not exists masterdle;
use masterdle;
create table if not exists User(
	uuid int primary key,
    user_name varchar(15) not null,
    user_passwrd varchar(60) not null
);