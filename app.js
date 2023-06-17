// node app.js
// Welcome , Create master password! accept userinput, (? Enter your password) -> re-enter -> main menu

import chalk from 'chalk';
import inquirer from 'inquirer';
import { master_password, menu } from './inquirers.js';

const greeting = () => {
    console.log(chalk.green("Welcome"));
    console.log("");
    console.log(chalk.blue("Create master password! You are going to need this everytime you login"));
}

const start = async() => {
    greeting();
    let valid_password = await master_password();
    while (valid_password == false) {
        console.log(chalk.red("Invalid password. Try Again."));
        valid_password = await master_password();
    }
    menu();
}

const main = () => {
    start();
}

main()