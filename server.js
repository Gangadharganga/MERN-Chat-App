const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const Todo = require('./model')
app.use(express.json())
mongoose.connect('mongodb+srv://gangadhar:gangadhar@cluster0.lq9zrqs.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('DB Connected')
)
app.use(cors({
    origin: '*'
}))
app.get('/gettodo', async (req, res) => {
    try {
        return res.json(await Todo.find());
    }
    catch (err) {
        console.log(err)
    }
    res.send("HIIIIIIIIIII")
})


app.post('/addtodos', async (req, res) => {
    const { todo, id } = req.body;

    try {
        const newData = new Todo({
            todo, id
        })
        await newData.save();
        return res.json(await Todo.find())
    } catch (error) {
        console.log("eroor.", error)
    }
})


app.delete('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        return res.json(await Todo.find())
    }
    catch (err) {
        console.log(err)
    }
})
app.put('/update/:id', async (req, res) => {
    const { todo, id } = req.body;
    try {
       
        const result = await Todo.updateOne(
            {
                todo,id
            }
          );
          return result
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(5000, () => {
    console.log("Appp is Running on 5000")
})