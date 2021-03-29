const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const inputCheck = require('./utils/inputCheck');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 5000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = new sqlite3.Database('./db/employee.db', err => {
    if (err) {
        return console.error(err.message);
    }

    console.log('Connected to the employee database');
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
        })
        .then(function (answer) {
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
    var list = 'SELECT * FROM departments';

}

// Get all rolles 
function viewRoles() {
    var list = 'SELECT * FROM roles';

}
// Get all rolles 
function viewEmployees() {
    var list = 'SELECT * FROM employee';

}

// Add a department 
function addDepartment() {
    
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
    
}



// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });

  // Start server after DB connection 
  db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        options();
  });
});
