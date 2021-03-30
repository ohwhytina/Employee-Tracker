USE employee_db;

INSERT INTO department (name, id)
VALUES 
('IT', 1),
('Sales', 2),
('Finance', 3),
('Legal', 4),
('HR', 5);

INSERT INTO roles (title, salary, department_id)
VALUES 
('IT Technician', 70000, 1),
('Marketing Coordinator', 65000, 2),
('Accountant', 85000, 3),
('General Counsel', 150000, 4),
('HR Coordinator', 60000, 5),
('General Manager', 100000, 5);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES
('Salvador', 'Gilbert', 6, null),
('Stacy', 'Buck', 2, 1),
('Ezra', 'Pace', 3, null),
('Charles', 'Dunlap', 4, null),
('Jake', 'Ho', 5, 1),
('Semaj', 'Hoover', 1, 1);


