const { Todo, User } = require("../models")



class TodoController {

    static postTodo(req, res) {
        console.log("Masukk Post");

        let { activity, description, date } = req.body

        let data = { activity, description, date, userId: req.loggedUser.id }
        Todo.create(data)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }

    static findAll(req, res) {
        // console.log("Masuuuuk");
        Todo.findAll({
            where: {
                userId: req.loggedUser.id
            }
        })
            .then(data => {
                console.log(data), "dataa";
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }

    static findById(req, res) {
        Todo.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                }
                else {
                    res.status(404).json({ message: "Data is Not Found" })
                }

            })
            .catch(err => {
                res.status(404).json(err)
            })
    }

    static edit(req, res) {

        let { activity, description, status, date } = req.body
        let data = { activity, description, status, date }

        Todo.update(data, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404)
            })

    }

    static editStatus(req, res) {
        let status = req.body.status

        Todo.update({ status }, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({ err })
            })

    }

    static delete(req, res) {
        Todo.findByPk(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: "Data Not Found" })
                } else {
                    return Todo.destroy({
                        where: {
                            id: +req.params.id
                        }
                    })
                }
            })
            .then(data => {
                res.status(200).json({ message: `Todo is Succes Deleted` })
            })
            .catch(err => {
                console.log(err, "errrrror=======");
                res.status(404).json({ err })
            })
    }
}

module.exports = TodoController