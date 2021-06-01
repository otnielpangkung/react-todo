const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Haaaay')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})