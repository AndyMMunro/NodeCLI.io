const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choice = require("inquirer/lib/objects/choice");
const Choices = require("inquirer/lib/objects/choices");

const teamMembersArray = [];

// iniatial question prompt for manager and the
function managerPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "managers name?"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "managers email address?"
        },
        {
            type: "input",
            name: "managerId",
            message: "what is the employees id?"
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "what is the managers office number?"
        },

    ])
        .then(function (managersAns) {
            const manager = new Manager(managersAns.managerName, managersAns.managerId, managersAns.managerEmail, managersAns.managerOfficeNumber)
            // console.log(manager);

            function myTeamMembersArr() {
                teamMembersArray.push(manager)
            }
            addEmpPrompt()
            myTeamMembersArr();

        })

        .catch(function (err) {
            console.log(err);
        });
};

// adds another employee and directs the user to there question bank and runs the render when 
// no more employees are added 
function addEmpPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "otherEmployees",
            message: "would you like to add another employee?",
            choices: ['engineer', 'intern', 'none']
        }
    ])
        .then(function (answers) {
            if (answers.otherEmployees === 'engineer') {
                addEngineerPrompt();
            }

            else if (answers.otherEmployees == 'intern') {
                addInternPrompt();
            }
            else {
                // console.log(teamMembersArray);
                render(teamMembersArray);

                return
            }

        })
        .catch(function (err) {
            console.log(err);
        });
};

// promts the questions realted to the intern and pushes them to the team array 
function addInternPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "interns name?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "interns email address?"
        },
        {
            type: "input",
            name: "internId",
            message: "what is the employees id?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "what school does the intern Attend?"
        }
    ])
        .then(function (internAnswers) {
            const intern = new Intern(internAnswers.internName, internAnswers.internEmail, internAnswers.internId, internAnswers.interSchool)
            // console.log(intern);

            function myTeamMembersArr() {
                teamMembersArray.push(intern)
            }

            myTeamMembersArr();
            addEmpPrompt()

        })

        .catch(function (err) {
            console.log(err);
        });

};

// promts the questions for the engineer and pushs them to the team array 
function addEngineerPrompt() {
    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "engineers name?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "engineers email address?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "what is the employees id?"
        },
        {
            type: "input",
            name: "github",
            message: "what is the engineers github username?"
        }
    ])
        .then(function (engAnswers) {
            const engineer = new Engineer(engAnswers.engineerName, engAnswers.engineerEmail, engAnswers.engineerId, engAnswers.github);
            // console.log(engineer);

            function myTeamMembersArr() {
                teamMembersArray.push(engineer);
            }
            myTeamMembersArr();
            addEmpPrompt();
        })

};

// call the inniatal function to start the program 
managerPrompt()

// function teamMembersArray (){ put this in all the .then funtions and to push to one massive Array then call the render function
    // push.answers
// }




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
