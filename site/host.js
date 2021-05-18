import express from 'express'

const port = 3060
const app = express()

app.use(express.static('public'))

app.listen(port, () => { console.log('App listening at http://localhost:' + port) })