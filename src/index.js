const https = require("https")
const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.send('Hello World!')
})

https
.createServer(app)
.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })
