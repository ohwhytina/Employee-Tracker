DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL NOT NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    roles_id INT NOT NULL,
    manager_id INT NULL
);