const { Todo } = require("../models")

async function authorization(req, res, next) {
    try {

        let id = req.params.id
        const todo = await Todo.findByPk(id)

        if (!todo) {
            res.status(404).json({ msg: "Todo Not Found" })
        } else {
            if (todo.userId !== req.loggedUser.id) {
                res.status(401).json({ msg: "Authorization Failed" })
            } else {
                next()
            }
        }

    } catch (error) {
        res.status(401).json({ msg: "Authorization Failed" })
    }
}

module.exports = authorization