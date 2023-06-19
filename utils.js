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

const sql_query = async(db, sql) => {
    try {
        const rows = await new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            });
        });
        return rows;
    } catch (err) {
        console.error(err.message);
    }
}

export {
    generate_password,
    sql_query
}