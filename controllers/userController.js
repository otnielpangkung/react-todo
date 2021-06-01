const { User, Todo } = require("../models")
const { bcryptPass, cekPass } = require("../helpers/bcrypt")
const { tokenGenerate, cekToken } = require("../helpers/token")

class UserController {
    static register(req, res) {
        console.log(req.body);
        let { username, password } = req.body

        User.create({
            username, password
        })
            .then(data => {
                res.status(201).json({
                    id: data.id,
                    username: data.email,

                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
    }

    static login(req, res) {
        // console.log("masuuuk log in");
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(data => {
                if (data) {
                    let password = cekPass(req.body.password, data.password)
                    if (password == true) {
                        let user = { username: data.username, id: data.id }
                        let access_token = tokenGenerate(user)
                        // console.log(token);
                        res.status(200).json({ id: data.id, username: data.username, access_token: access_token })

                    } else {
                        res.status(401).json({ msg: "username / password Invalid " })
                    }
                } else {
                    res.status(401).json({ msg: "username / password Invalid " })
                }

            })
    }
}