-- create database if not exists masterdle;
-- use masterdle;

-- drop table if exists User;

create table if not exists User(
	uuid varchar(60) primary key,
    user_name varchar(15) unique not null,
    user_passwrd varchar(60) not null,
    user_role varchar(10) default "user"
);

-- drop table if exists DataGame1;

create table if not exists DataGame1(
	id int primary key auto_increment,
	name varchar(20) not null,
    gamer_type int,
    student_type int,
    entry_level varchar(2)
);

insert into DataGame1 (name, gamer_type, student_type, entry_level)
values ('Jules FINCK', 0, 0, "L3");