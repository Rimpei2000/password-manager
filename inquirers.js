import inquirer from 'inquirer';
import chalk from 'chalk';

const master_password_inq = async() => {
    const valid = await inquirer
        .prompt([
            {
                name: 'master password',
                type: 'password',
                mask: '*',
                message: 'Enter your password'
            }
        ])
        .then((answer) => {
            console.clear();
            const valid = inquirer
                .prompt([
                    {
                        name: 'master password re-enter',
                        type: 'password',
                        mask: '*',
                        message: 'Re-enter your password'
                    }
                ])
                .then((reenter) => {
                    return answer['master password'] == reenter['master password re-enter'];
                })
            return valid;
        });
        return valid;
}

const menu_inq = async() => {
    console.clear();
    const menu_option = await inquirer
        .prompt([
            {
                name: 'menu',
                message: 'What do you want to do?',
                type: 'list',
                choices: [
                    chalk.blue('Show Password'), 
                    chalk.green('Store Password'), 
                    chalk.yellow('Generate Password'),
                    chalk.red('Delete Password'),
                    'Quit'
                ]

            }
        ])
        .then(answer => {
            return answer
        });
    return menu_option;
}

const generate_inq = async() => {
    console.clear();
    const service_name_id = await inquirer
        .prompt([
            {
                name: 'service_name',
                message: 'What is the name of the service?',
            }
        ])
        .then(async(name) => {
            console.clear();
            const id = await inquirer
                .prompt([
                    {
                        name: 'account_id',
                        message: 'What is your account ID?'
                    }
                ])
                .then(id => {
                    return id;
                });
            return [name, id];
        });
    return service_name_id;
}

const padlocks_inq = (raw_padlocks) => {
    const padlocks = raw_padlocks.map(item => 
        `Service: ${item.service_name}\t\t\tID: ${item.account_id}`
      );
    console.clear();
    inquirer
        .prompt([
            {
                name: 'padlocks',
                message: 'Which padlock do you want to open?',
                type: 'list',
                choices: padlocks
            }
        ])
}

export {
    master_password_inq,
    menu_inq,
    generate_inq,
    padlocks_inq
}