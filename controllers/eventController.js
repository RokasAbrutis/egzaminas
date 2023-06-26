const DB_upload = require("../models/eventModel");
const bcrypt = require("bcrypt")

exports.create = async (req, res) => {

    const { name, category, date, address, user } = req.body;

    if(name, category, date, address, user) {
        DB_upload.create([name, category, date, address, user])

        res.status(200).json({message: "Created succesfully"});
    } else {
        res.status(400).json({message: "Please fill out all fields"});
    }

}

exports.user_events = async (req, res) => {
    const { user } = req.body

    let data = await DB_upload.user_events(user)

    res.status(200).json(data[0]);
}

exports.edit = async (req, res) => {
    const { id, name, category, date, address } = req.body;
    
    await DB_upload.edit([name, category, date, address, id])

    res.status(200).json({message: "Event updated successfully"});
}

exports.delete = async (req, res) => {
    const { id } = req.body

    await DB_upload.delete([id])

    res.status(200).json({message: "Deleted successfully"})
}

exports.all = async (req, res) => {
    
    let data = await DB_upload.all()

    res.status(200).json(data[0]);
}

exports.adminEdit = async (req, res) => {
    const { id, name, category, date, address, status } = req.body;
    
    await DB_upload.admin_edit([name, category, date, address, status, id])

    res.status(200).json({message: "Event updated successfully"});
}

exports.getVotes = async (req, res) => {
    const { id } = req.body

    let votes = await DB_upload.getVotes([id])

    res.status(200).json(votes[0][0]);
}

exports.vote = async (req, res) => {
    let { id, votes } = req.body

    votes = votes + 1

    await DB_upload.vote([votes, id])

    res.status(200).json({message: "Voted successfully"});
}