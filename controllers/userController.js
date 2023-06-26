const DB_upload = require("../models/userModel");
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {

    const { email, password, repeatPassword } = req.body;

    const users = await DB_upload.users();
    const match = [];

    users[0].forEach(user => {
        if (user.email == email) {
            res.status(200).json({ message: "Email taken" });
            match.push(user);
        }
    })

    if (match.length == 0) {
        if(password == repeatPassword) {

            //slaptazodzio encryptinimas
            const hash = await bcrypt.hash(password, 10);

            //session
            let newUser = { email: email, password: hash};

            req.session.user = newUser;

            await DB_upload.register([email, hash])
        
            res.status(200).json({ message: "Created succesfully", session: req.session.user });
        } else {
            res.status(200).json({ message: "Passwords do not match" });
        }
    }
}

exports.login = async (req, res) => {

    const {email, password} = req.body;


    let check = await DB_upload.login([email])

    let match;

    if(check[0].length > 0) {
        match = await bcrypt.compare(password, check[0][0].password)
    } else {
        match = false
    }


    if (check[0].length > 0 && match) {
        res.status(200).json([{message: "Logged In"}, {email: check[0][0].email, password: check[0][0].password}])
    } else {
        res.status(401).json({message: "El. paštas arba slaptažodis neteisingas"})
    }

    
}

exports.current_user = async (req, res) => {

    console.log(req.body.email)
    
    let data = await DB_upload.user(req.body.email)


    res.status(200).json(data[0][0])
}

exports.edit = async (req, res) => {

    const { slapyvardis, email, telefonas, slaptazodis, repeatSlaptazodis, id } = req.body

    if(!slaptazodis) {
        await DB_upload.edit([slapyvardis, email, telefonas, id])
        let data = await DB_upload.user(slapyvardis)

        res.status(200).json([{message: "Pakeitimai išsaugoti"}, {name: slapyvardis, password: data[0][0].slaptazodis}])
    } else if(slaptazodis.length > 0 && slaptazodis == repeatSlaptazodis) {
        const hash = await bcrypt.hash(slaptazodis, 10);
        await DB_upload.edit([slapyvardis, email, telefonas, hash, id])

        res.status(200).json([{message: "Pakeitimai išsaugoti"}, {name: slapyvardis, password: hash}])
    } else {
        res.json([{message: "Slaptažodžiai nesutampa"}])
    }
}
