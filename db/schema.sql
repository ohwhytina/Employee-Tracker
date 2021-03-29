CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY,
    title VARCHA(30) NOT NULL,
    dept_id INT NOT NULL,
    salary DECIMAL NOT NULL
);

CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL,
    mgr_id INT NULL
);