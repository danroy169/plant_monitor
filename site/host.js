import express from 'express'
import { readFile } from 'fs/promises'

const app = express()

app.use(express.static('public'))

async function init(){
    const file = await readFile('./env.json', { encoding: 'utf-8', flag: 'r' })

    const env = JSON.parse(file)

    const port = env.site_port

    const host = env.localhost

    app.listen(port, () => { console.log('App listening at ' + host + port) })
}

init()