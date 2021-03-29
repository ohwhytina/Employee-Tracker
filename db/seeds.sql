INSERT INTO departments (name)
VALUES 
('IT'),
('Sales'),
('Finance'),
('Legal'),
('HR');

INSERT INTO roles (title, dept_id, salary)
VALUES 
('IT Technician', 70000, 1),
('Marketing Coordinator', 65000, 2),
('Accountant', 85000, 3),
('General Counsel', 150000, 4),
('HR Coordinator', 60000, 5),
('General Manager', 100000, 6);


INSERT INTO employee (first_name, last_name, role_id, mgr_id)
VALUES
('Salvador', 'Gilbert', 6, null),
('Stacy', 'Buck', 2, 1),
('Ezra', 'Pace', 3, null),
('Charles', 'Dunlap', 4, null),
('Jake', 'Ho', 5, 1),
('Semaj', 'Hoover', 1, 1);


