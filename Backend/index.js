const connectToMongo = require('./db')
const express = require('express')
var auth = require('./routes/auth')
connectToMongo();

const app = express()
const port = 5000
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})
app.use('/api/auth', auth)
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})