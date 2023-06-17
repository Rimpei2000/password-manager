// node app.js
// Welcome , Create master password! accept userinput, (? Enter your password) -> re-enter -> main menu

import chalk from 'chalk';
import inquirer from 'inquirer';

const start = () => {
    console.log(chalk.green("Welcome"));
    console.log("");
    console.log(chalk.blue("Create master password! You are going to need this everytime you login"));
    inquirer
        .prompt([
            {
                name: 'master password',
                type: 'password',
                mask: '*',
                message: 'Enter your password'
            }
        ])
        .then((answer) => {
            console.log(answer);
        })
}

const main = () => {
    start();
}

main()