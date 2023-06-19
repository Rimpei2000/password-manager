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

const padlocks_inq = async(raw_padlocks) => {
    const padlocks = raw_padlocks.map(item => 
        `Service: ${item.service_name}\t\t\tID: ${item.account_id}`
      );
    console.clear();
    const chosen_padlock = await inquirer
        .prompt([
            {
                name: 'padlocks',
                message: 'Which padlock do you want to open?',
                type: 'list',
                choices: padlocks
            }
        ])
        .then(answer => {
            return answer['padlocks'];
        });
    
    return chosen_padlock;
}

const continue_inq = async() => {
    const res = await inquirer
        .prompt([
            {
                name: 'continue',
                message: 'Do you want to continue? (y/n)',
                type: 'input',
                validate: function(input) {
                    const isValid = /^y|n$/i.test(input); // Validates if input is either 'y' or 'n' (case-insensitive)
                    if (isValid) {
                    return true;
                    }
                    return 'Please enter either "y" for Yes or "n" for No.';
                },
            }
        ])
        .then(answer => {
            return answer['continue'];
        });

    return res;
}

export {
    master_password_inq,
    menu_inq,
    generate_inq,
    padlocks_inq,
    continue_inq
}