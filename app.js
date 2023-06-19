import chalk from 'chalk';
import sqlite3 from 'sqlite3';
import { 
    continue_inq,
    generate_inq,
    master_password_inq,
    menu_inq,
    padlocks_inq,
} from './inquirers.js';
import {
    generate_password,
    sql_query,
} from './utils.js';
let db;

const greeting = () => {
    console.log(chalk.green("Welcome"));
    console.log("");
    console.log(chalk.cyan("Create master password! You are going to need this everytime you login"));
}

const init_db = () => {
    db = new sqlite3.Database("./mock.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    })

    const sql = `CREATE TABLE IF NOT EXISTS Passwords (
        service_name VARCHAR(255) NOT NULL,
        account_id VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (service_name, account_id)
    )`;

    sql_query(db, sql);
}

const show = async () => {
    let sql = `SELECT * FROM Passwords`;
  
    try {
        const rows = await sql_query(db, sql);
        const chosen_padlock = await padlocks_inq(rows);
        const service_name = chosen_padlock.split(" ")[1].split("\t")[0];
        const account_id = chosen_padlock.split(" ")[2];

        sql = `SELECT password FROM Passwords WHERE service_name='${service_name}' AND account_id='${account_id}'`;
        const data = await sql_query(db, sql);

        const password = data[0]['password'];
        console.log(chalk.cyan(`Your password: ${password}`));
        const next_option = await continue_loop();
        return next_option;
    } catch (err) {
        console.error(err);
    }
};

const store = async() => {
    console.log("store");
    const next_option = await continue_loop();
    return next_option;
}

const generate = async() => {
    const info = await generate_inq();
    const service_name = info[0]['service_name'];
    const account_id = info[1]['account_id'];
    const generated_password = generate_password();
    const sql = `INSERT INTO Passwords (
        service_name,
        account_id,
        password
    ) VALUES (
        '${service_name}',
        '${account_id}',
        '${generated_password}'
    )`;
    sql_query(db, sql);
    console.log(chalk.green("Password created!"));
    console.log(chalk.cyan("Your new password: " + generated_password + " is now stored in the database!"));

    const next_option = await continue_loop();
    return next_option;
}

const deletion = async() => {
    console.log("dele");
}

const quit = () => {
    return "quit"
}

const continue_loop = async() => {
    const y_or_n = await continue_inq();
    if (y_or_n == "y") {
        let option =  await menu();
        return option;
    } else {
        return "quit"
    }
}

const init = async() => {
    greeting();
    init_db();
    let valid_password = await master_password_inq();
    while (valid_password == false) {
        console.log(chalk.red("Invalid password. Try Again."));
        valid_password = await master_password_inq();
    }    
}

const menu = async() => {
    let menu_option = await menu_inq();
    console.clear();

    return JSON.stringify(menu_option['menu']);
}

const main = async() => {
    await init();
    let menu_option = await menu();
    
    while (menu_option !== "quit") {
        if (typeof menu_option === "string" && menu_option.includes('Show')) {
            menu_option = await show();
        } else if (typeof menu_option === "string" && menu_option.includes('Store')) {
            menu_option = await store();
        } else if (typeof menu_option === "string" && menu_option.includes('Generate')) {
            menu_option = await generate();
        } else if (typeof menu_option === "string" && menu_option.includes('Delete')) {
            menu_option = await deletion();
        } else {
            menu_option = quit();
        }
    }
}

main();