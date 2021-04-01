
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();


app.use((req, res) => {
    res.status(404).end();
  }); 

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'employee_db'
});


// Establishing Connection to database
connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message)
    }
    console.log("Welcome to employee tracker!");
    options()
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
                    connection.end();
                    break;
             
            }
        })
};

// Get all departments 
function viewDepartments() {
    connection.query(
        "SELECT * FROM department;",
        function (err, answer) {
            if (err) {throw err;}
            console.log("RECEIVED LIST FROM DEPARTMENTS");
        console.table(answer);
        options();
    });
   
};

// Get all roles 
function viewRoles() {
    connection.query(
        'SELECT * FROM roles',
        function (err, answer) {
            if (err) {throw err;}
        console.log("RECEIVED LIST of ROLES");
        console.table(answer);
        options();
    });

};

// Get all employee 
function viewEmployees() {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.namee AS department, roles.salary FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id',
        function (err, answer) {
            if (err) {throw err;}
        console.log("RECEIVED LIST of EMPLOYEES");
        console.table(answer);
        options();
    });

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
                {namee: answer.department
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
    connection.query('SELECT * FROM roles', function (err, answer) {
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
            type: "input",
            message: "Enter employee first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter employee last name",
            name: "lastName"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO employee SET?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: null,
            manager_id: null
        },
        function(err, answer) {
            if (err) {
                throw err;
            }
            console.table(answer);
            options();
        }
        );
        
    })
}

// // Update an Employee Role
// function updateEmployee() {
//     var empList = [];
//     var roleList = [];
//     connection.query("SELECT * FROM employee", function(err,answer) {
//         for (let i=0; i < answer.length; i++) {
//             var empInfo = answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
//             empList.push(empInfo);
//         }
//     connection.query("SELECT * FROM roles", function(err,answer) {
//         for (i=0; i < answer.length; i++){
//             roleList.push(answer[i].title);
//         }
//         inquirer
//         .prompt([
//             {
//                 type: "list",
//                 name: "updateRole",
//                 message: "Update Role for which employee?",
//                 choices: empList
//             },
//             {
//                 type: "list",
//                 name: "newRole",
//                 message: "Select New Role",
//                 choices: roleList
//             }
//         ]).then(function(answer) {
//             const roleUpdate = {};
//             roleUpdate.employeeId = parseInt(answer.updateEmployee.split(" ")[0]);
//             if (answer.newRole = )
//         })
//     }
// }


