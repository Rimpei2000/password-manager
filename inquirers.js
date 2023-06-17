import inquirer from 'inquirer';
import chalk from 'chalk';

async function master_password() {
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
            return valid
        });

        return valid;
}

function menu() {
    console.clear();
    inquirer
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
            console.log(answer)
        })
}

export {
    master_password,
    menu
}