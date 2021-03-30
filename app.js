const mysql = require('mysql');
const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const PORT = process.env.PORT || 8019;


const connection = mysql.createConnection({
    host: 'localhost',
    port: 8019,
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err

});


function options() {
    inquirer 
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to Employee Tracker! What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees', 
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee role',
                'Quit'
            ]
        }).then(function (answer) {
            switch (answer.action){
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployee();
                    break;
                case 'QUIT':
                    quitApp();
                    break;
                default:
                    break;
            }
        })
};

// Get all departments 
function viewDepartments() {
    connection.query(
        'SELECT * FROM department',
        function (err, answer) {
        console.table(answer);
    });
    options();
};

// Get all rolles 
function viewRoles() {
    connection.query(
        'SELECT * FROM roles',
        function (err, answer) {
        console.table(answer);
    });
    options();
};

// Get all rolles 
function viewEmployees() {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id',
        function (err, answer) {
        console.table(answer);
    });
    options();
}

// Add a department 
function addDepartment() {
    inquirer
}

// Add a Role
function addRole() {

}

// Add an Employee
function addEmployee() {
    
}

// Update an Employee Role
function updateEmployee() {
    
}

// quit app
function quitApp() {
    console.log("Thank you for using Employee Tracker!");
    connection.end();
}

options();