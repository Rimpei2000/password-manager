// node app.js
// Welcome , Create master password! accept userinput, (? Enter your password) -> re-enter -> main menu

import chalk from 'chalk';
import sqlite3 from 'sqlite3';
import { 
    generate_inq,
    master_password_inq,
    menu_inq,
    padlocks_inq,
} from './inquirers.js';
import {
    generate_password,
} from './utils.js';
let db;

const greeting = () => {
    console.log(chalk.green("Welcome"));
    console.log("");
    console.log(chalk.blue("Create master password! You are going to need this everytime you login"));
}

const init_db = () => {
    db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    })

    db.run(
        `CREATE TABLE IF NOT EXISTS Passwords (
            service_name VARCHAR(255) NOT NULL,
            account_id VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            PRIMARY KEY (service_name, account_id)
        )`
    );

    // db.run(
    //     `INSERT INTO Passwords (
    //         service_name,
    //         account_id,
    //         password
    //     ) VALUES (
    //         'google.com',
    //         'ggg',
    //         'ggg'
    //     )`
    // );
}

const show = () => {
    const sql = `SELECT * FROM Passwords`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        padlocks_inq(rows)
        // rows.forEach(row => {
        //     console.log(row)
        // })
    });

}

const store = () => {
    console.log("store");
}

const generate = async() => {
    const info = await generate_inq();
    const service_name = info[0]['service_name'];
    const account_id = info[1]['account_id'];
    const generated_password = generate_password();
    console.log(chalk.green("Password created!"));
    console.log(chalk.blueBright("Your new password: " + generated_password));
}

const deletion = () => {
    console.log("dele");
}

const quit = () => {
    console.log("q");
}

const start = async() => {
    greeting();
    init_db();
    let valid_password = await master_password_inq();
    while (valid_password == false) {
        console.log(chalk.red("Invalid password. Try Again."));
        valid_password = await master_password_inq();
    }

    let menu_option = await menu_inq();
    console.clear();

    return JSON.stringify(menu_option['menu']);
}

const main = async() => {
    let menu_option = await start();

    if (menu_option.includes('Show')) {
        show();
    } else if (menu_option.includes('Store')) {
        store();
    } else if (menu_option.includes('Generate')) {
        generate();
    } else if (menu_option.includes('Delete')) {
        deletion();
    } else {
        quit();
    }
}

main();