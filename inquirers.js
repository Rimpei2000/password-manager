import inquirer from "inquirer";
import chalk from "chalk";

const master_password_inq = async () => {
  const valid = await inquirer
    .prompt([
      {
        name: "master password",
        type: "password",
        mask: "*",
        message: "Enter your password",
      },
    ])
    .then((answer) => {
      console.clear();
      const valid = inquirer
        .prompt([
          {
            name: "master password re-enter",
            type: "password",
            mask: "*",
            message: "Re-enter your password",
          },
        ])
        .then((reenter) => {
          return (
            answer["master password"] == reenter["master password re-enter"]
          );
        });
      return valid;
    });
  return valid;
};

const menu_inq = async () => {
  console.clear();
  const menu_option = await inquirer
    .prompt([
      {
        name: "menu",
        message: "What do you want to do?",
        type: "list",
        choices: [
          chalk.blue("Show Password"),
          chalk.green("Store Password"),
          chalk.yellow("Generate Password"),
          chalk.red("Delete Password"),
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      return answer;
    });
  return menu_option;
};

const service_name_account_id_inq = async () => {
  console.clear();
  const service_name_id = await inquirer
    .prompt([
      {
        name: "service_name",
        message: "What is the name of the service?",
      },
    ])
    .then(async (name) => {
      console.clear();
      const id = await inquirer
        .prompt([
          {
            name: "account_id",
            message: "What is your account ID?",
          },
        ])
        .then((id) => {
          return id;
        });
      return [name, id];
    });
  return service_name_id;
};

const service_name_account_id_password_inq = async () => {
  const info = await service_name_account_id_inq();
  console.clear();
  const password = await inquirer
    .prompt([{ name: "password", message: "What is your password?" }])
    .then((password) => {
      return password;
    });
  return [...info, password];
};

const padlocks_inq = async (raw_padlocks, type) => {
  let padlocks = raw_padlocks.map(
    (item) => `Service: ${item.service_name}\t\t\tID: ${item.account_id}`
  );
  padlocks.push("Back");
  console.clear();
  const chosen_padlock = await inquirer
    .prompt([
      {
        name: "padlocks",
        message: "Which padlock do you want to open?",
        type: type,
        choices: padlocks,
      },
    ])
    .then((answer) => {
      return answer["padlocks"];
    });

  return chosen_padlock;
};

const continue_inq = async () => {
  const res = await inquirer
    .prompt([
      {
        name: "continue",
        message: "Do you want to continue? (y/n)",
        type: "input",
        validate: function (input) {
          const isValid = /^y|n$/i.test(input); // Validates if input is either 'y' or 'n' (case-insensitive)
          if (isValid) {
            return true;
          }
          return 'Please enter either "y" for Yes or "n" for No.';
        },
      },
    ])
    .then((answer) => {
      return answer["continue"];
    });

  return res;
};

const delete_inq = async () => {
  const res = await inquirer
    .prompt([
      {
        name: "service_name",
        message: "Which service do you want to delete?",
        type: "input",
      },
    ])
    .then((answer) => {
      const service_name = answer["service_name"];
    });
};

export {
  master_password_inq,
  menu_inq,
  service_name_account_id_inq,
  service_name_account_id_password_inq,
  padlocks_inq,
  continue_inq,
};
