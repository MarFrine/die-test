const express = require("express")
const fs = require("fs")
const socket = require("socket.io")

const app = express()
const port = process.env.PORT || 8080

const server = app.listen(port, (req,res)=>{
    console.log("Server on port ", port)
})

const io = socket(server)

io.on("connection", (socket)=>{
    socket.on("test", ()=>{
        socket.emit("test")
    })
})

app.use(express.static("./public"))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

let globalNumber = undefined

app.get("/data", (req, res)=>{
    res.status(200).json({value: globalNumber})
})

app.post("/data", (req, res)=>{
    const {value} = req.body
    console.log(value)
    globalNumber = value
    res.status(200).json({value: globalNumber})
})


