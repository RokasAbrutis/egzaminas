const con = require("./DB");

exports.create = async (params) => {
    const register = await con.query(`INSERT INTO events(name,category,date,address, user) VALUES (?, ?, ?, ?, ?)`, params)

    return register;

}

exports.user_events = async (params) => {
    const user_events = await con.query(`SELECT * FROM events WHERE user = "${params}"`)

    return user_events;
}

exports.edit = async (params) => {
    const edit = await con.query(`UPDATE events SET name=?,category=?,date=?,address=? WHERE id = ?`, params)

    return edit;
}

exports.delete = async (params) => {
    const del = await con.query(`DELETE FROM events WHERE id = ?`, params)

    return del;
}

exports.all = async () => {
    const all = await con.query("SELECT * FROM events")

    return all;
}

exports.admin_edit = async (params) => {
    const edit = await con.query(`UPDATE events SET name=?,category=?,date=?,address=?,status=? WHERE id = ?`, params)

    return edit;
}

exports.getVotes = async (params) => {
    const getVotes = await con.query("SELECT votes FROM events WHERE id = ?", params)

    return getVotes
}

exports.vote = async (params) => {

    const vote = await con.query(`UPDATE events SET votes = ? WHERE id = ?`, params)

    return vote;
}