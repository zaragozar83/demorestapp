const https = require("https")
const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

https
.createServer(app)
.listen(8080, ()=>{
    console.log(`Example app listening on port 8080`)
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
