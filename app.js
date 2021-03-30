const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3009,
    user: 'root',
    password: 'password',
    database: 'employee_db',
});

// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;
    console.log("Welcome to employee tracker!");
    options();
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
        .prompt({
            type: "input",
            message: "Enter Department Name",
            name: "department"
        }).then(function(answer){
            connection.query(
                'INSERT INTO department SET ?',
                {name: answer.department
                },
                function(err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),
            console.table(answer);
            options();
        })
}

// Add a Role
function addRole() {
    var deptList = [];
    connection.query('SELECT * FROM department', function (err, answer) {
        for (i=0; i < answer.length; i++){
            deptList.push(answer[i].name);
        }
    })
    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter Role Title",
            name: "addTitle"
        },
        {
            type: "input",
            message: "Select Department ID",
            name: "deptId",
            choices: deptList
        },
        {
            type: "input",
            message:"Enter Role Salary",
            name: "addSalary"
        }
    ]).then(function(answer){
        connection.query('INSERT INTO role SET ?',
            {
                title: answer.addTitle,
                department_id: answer.deptId,
                salary: answer.addSalary
            },
            function(err, answer){
                if (err) {
                    throw err;
                }
            })
            options();
    })
}

// Add an Employee
function addEmployee() {
    inquirer
    .prompt([
        {
            
        }
    ])
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