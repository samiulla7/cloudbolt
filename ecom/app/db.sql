drop database if exists ecom_db;
create database ecom_db CHARACTER SET utf8 COLLATE utf8_general_ci;
grant all on ecom_db.* to 'ecomadmin'@'localhost' identified by 'Root@123';
