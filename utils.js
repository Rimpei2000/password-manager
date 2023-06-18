import { generate } from "generate-password";

const generate_password = () => {
    let password = generate({
        length: 20,
        numbers: true,
        symbols: true,
        strict: true,
        exclude: '"',
    });

    return password;
}

export {
    generate_password
}