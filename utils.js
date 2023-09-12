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
};

const sql_query = async (db, sql) => {
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
};

const doesDuplicateExist = async (db, service_name, account_id) => {
  let sql = `SELECT * FROM Passwords`;
  const rows = await sql_query(db, sql);
  console.log(rows);
  const pairsSet = new Set(
    rows.map((item) => [item.service_name, item.account_id])
  );
  for (const pair of pairsSet) {
    if (pair[0] === service_name && pair[1] === account_id) {
      console.log(pair, service_name, account_id);
      return true;
    }
  }
  return false;
};

export { generate_password, sql_query, doesDuplicateExist };
