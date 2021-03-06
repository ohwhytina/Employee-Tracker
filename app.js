
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3002;
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
                // 'Update an Employee role',
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
                // case 'Update an Employee Role':
                //     updateRole();
                //     break;
                case 'Quit':
                    quitApp();
                    break;
             
            }
        })
};


// Get all departments 
function viewDepartments() {
    connection.query(
        "SELECT * FROM department;",
        function (err, answer) {
            if (err) {
                throw err;
            }
        console.log("RECEIVED LIST of DEPARTMENTS");
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
            if (err) {
                throw err;
            }
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
    connection.query('SELECT * FROM department', function (err, answer) {
        for (i=0; i < answer.length; i++){
            deptList.push(answer[i].id + " " + answer[i].namee);
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
            type: "list",
            message: "Select Department ID ",
            name: "deptId",
            choices: deptList
        },
        {
            type: "input",
            message:"Enter Role Salary",
            name: "addSalary"
        }
    ]).then(function(answer){
        connection.query('INSERT INTO roles SET ?',
            {
                title: answer.addTitle,
                department_id: parseInt(answer.deptId.split(" ")[0]),
                salary: answer.addSalary
            },
            function(err, answer){
                if (err) {
                    throw err;
                }
            })
            console.log("Role Added!")
            options();
    })
}

// Add an Employee
function addEmployee() {
    const empList = [];
    connection.query("SELECT * FROM employee", function(err,answer){
        for (let i = 0; i < answer.length; i++){
            let empInfo = answer [i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            empList.push(empInfo);
        }
    });
    const roleList = [];
    connection.query("SELECT * FROM roles", function(err,answer){
        for (let i = 0; i < answer.length; i++){
            let roleInfo = answer [i].id + " " + answer[i].title;
            roleList.push(roleInfo);
        }
    });

    inquirer
    .prompt([
        {
            type: "input",
            message: "Enter Employee First Name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter Employee Last Name",
            name: "lastName"
        },
        {
            type: "list",
            message: "Enter Employee Role",
            name: "role",
            choices: roleList   
        },
        {
            type: "list",
            message: "Enter Employee Manager",
            name: "manager",
            choices: empList   
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            roles_id: parseInt(answer.role.split(" ")[0]),
            manager_id: parseInt(answer.manager.split(" ")[0])
        },
        function(err, answer) {
            if (err) {
                throw err;
            }
            console.log("Employee Added!");
            options();
        }
        );
        
    })
}

// // Update an Employee Role
// function updateRole() {
//     var empList = [];
//     connection.query("SELECT * FROM employee", function(err,answer){
//         for (let i = 0; i < answer.length; i++){
//             let empInfo = answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
//             empList.push(empInfo);
//         }
//     });

//     var roleList = [];
//     connection.query("SELECT * FROM roles", function(err,answer){
//         for (let i = 0; i < answer.length; i++){
//             let roleInfo = answer[i].id + " " + answer[i].title;
//             roleList.push(roleInfo);
//         }
//     });

//         inquirer
//         .prompt([
//             {
//                 type: "list",
//                 message: "Enter Employee",
//                 name: "manager",
//                 choices: empList   
//             },
//             {
//                 type: "list",
//                 message: "Enter Employee Role",
//                 name: "role",
//                 choices: roleList   
//             }
//         ]).then(function(answer) {
//             connection.query("UPDATE employee SET role_id = ? WHERE id = ?", 
//             {
//                 roles_id: parseInt(answer.role.split(" ")[0]),
//                 id: parseInt(answer.manager.split(" ")[0])
//             },
//             function(err, answer) {
//                 if (err) {
//                     throw err
//                 }
//                 console.log("Employee Updated")
//                 options();
//             }
//         )
//     })
// }

function quitApp() {
    console.log("Thanks for using Employee Tracker");
    connection.end();
}
   

