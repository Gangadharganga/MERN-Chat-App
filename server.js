const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
const Todo = require('./model')
const userMessage = require('./Models/MessageModel')
const RegisterUser = require('./Models/UserModel')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
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
                todo, id
            }
        );
        return result
    }
    catch (err) {
        console.log(err)
    }
})
app.post('/rgisteruser', async (req, res) => {
    const { user, mobile, password, confirmpassword, email } = req.body
    console.log("user....", user)
    try {
        const exist = await RegisterUser.findOne({ email })
        if (exist) {
            return res.status(400).send("User Already Registered...")
        }
        if (password != confirmpassword) {
            return res.status(404).send('Password not Matched...')
        }
        let newUser = new RegisterUser({
            user, mobile, password, confirmpassword, email
        })
        newUser.save()
        return res.status(200).send("Register Sucessfully...")
    } catch (error) {
        return res.status(500).send('Server Error')
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const existUser = await RegisterUser.findOne({ email })
        if (!existUser) {
            return res.status(404).send("User not Registerged. Please Register")
        }
        if (existUser.password != password) {
            return res.status(404).send("Password Missmatched...!")
        }
        console.log("existUser.id..", existUser.id)
        const payload = {
            user: { id: existUser.id }
        }
        jwt.sign(payload, "jwtsecurepassword", { expiresIn: '1h' }, (err, token) => {
            if (err) throw new Error(err)
            return res.json({ token })
        });
    } catch (error) {
    }
})
app.get('/allprofiles', middleware, async (req, res) => {
    try {
        const allProfiles = await RegisterUser.find()
        return res.json(allProfiles)
    } catch (error) {
        res.status(500).send("Server Error..")
    }
})
app.get('/myprofile', middleware, async (req, res) => {
    console.log("req.user..", req.user.id)
    try {
        const myprofile = await RegisterUser.findById(req.user.id)
        return res.json(myprofile)
    } catch (error) {
        console.log(error)
    }
})
// Message Posted...
app.post('/sendMsg', middleware, async (req, res) => {
    try {
        const { text } = req.body
        const existingUser = await RegisterUser.findById(req.user.id)
        console.log("existingUser..", existingUser)
        const newMsg = new userMessage({
            user: req.user.id,
            username: existingUser.user,
            text
        })
        await newMsg.save()
        const allmsges = await userMessage.find()
        return res.json(allmsges)
    } catch (error) {
        console.log("Message Error", error)
    }
})
app.get('/gettingmessges', middleware, async (req, res) => {
    try {
        const allmsges = await userMessage.find()
        return res.json(allmsges)
    } catch (error) {
    }
})
app.listen(5000, () => {
    console.log("Appp is Running on 5000")
})