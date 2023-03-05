const studentArray = require('./InitialData')
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { query } = require('express');
const port = 3001
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let lastStudentId = studentArray[studentArray.length - 1]['id']
const removedIdArray = []

app.get("/api/student", (req, res) => {
    res.send(studentArray)
})



app.get("/api/student/:id", (req, res) => {
    const idNum = +req.params.id 
    console.log(req.params)
    if (idNum > lastStudentId || idNum < 1) {
        res.status(404).send(`<h2>Invalid id</h2>`)
    }
    else {
        let flag = true
        for (let j = 0; j < removedIdArray.length; j++) {
            if (idNum == removedIdArray[j]) {
                flag = false
                break
            }
        }
        if (flag == false) {
            res.status(404).send(`<h2>Invalid id</h2>`)
        }
        else {
            for (let i = 0; i < studentArray.length; i++) {

                if (idNum == studentArray[i].id) {
                    res.send(studentArray[i])
                }
            }
        }
    }
})




app.post("/api/student", (req, res) => {

    let studentDetails = req.query

    if (Object.keys(studentDetails).length < 3 || Object.keys(studentDetails).length > 3) {
        res.status(400).send(`<h2>Incomplete details</h2>`)
    }
    else {
        studentDetails['id'] = 1 + lastStudentId
        studentArray.push(studentDetails)
        lastStudentId = lastStudentId + 1
        console.log(studentDetail)
        res.writeHead(200, { 'content-type': 'application/x-www-form-urlencoded' })
        res.end(JSON.stringify({ id: studentDetails['id'] }))
    }

})




app.put("/api/student/:id", (req, res) => {
    const id = +req.params.id
    const details = req.query
    console.log(details, id)
    let mp = new Map()
    
    let flag = true
    for (let i in studentArray[0]) {
        mp.set(i)
    }
    for (let i in details) {
        if (mp.has(i) == false) {
            flag = false
            break
        }
    }
   console.log(flag)
    if (id > lastStudentId || id < 1 || flag == false) {
        console.log(lastStudentId)
        res.status(400).send("invalid id or invalid update field")
    }
    else {
        res.writeHead(200, { 'content-type': 'application/x-www-form-urlencoded' })
        for (let i = 0; i < studentArray.length; i++) {
            if (id == studentArray[i].id) {
                for (let x in details) {
                    console.log(x)
                    studentArray[i][x] = details[x]
                }
                break
            }
        }
    }
})



app.delete("/api/student/:id", (req, res) => {
    const id = +req.params.id
    for (let i = 0; i < studentArray.length; i++) {
        if (id == studentArray[i].id) {
            removedIdArray.push(id)
            studentArray.splice(i, 1)
            console.log(removedIdArray)
        }
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;



