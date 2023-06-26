const con = require("./DB");

exports.register = async (params) => {
    const register = await con.query(`INSERT INTO users(email,password) VALUES (?, ?)`, params)

    return register;

}

exports.users = async () => {
    const users = await con.query(`SELECT * FROM users`)

    return users;
}

exports.login = async (params) => {
    const login = await con.query(`SELECT * FROM users WHERE email = ?`, params)

    return login
}

exports.user = async (name) => {
    const user = await con.query(`SELECT * FROM users WHERE email = '${name}'`)

    return user
}

// exports.edit = async (params) => {
//     const edit = await con.query(`UPDATE users SET slapyvardis = ?, email = ?, telefonas = ? ${params.length == 5 ? ", slaptazodis = ?" : ""} WHERE ID = ?`, params)

//     return edit;
// }