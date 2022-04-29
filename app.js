const express = require ('express')
const app = express()
const fs = require("fs")
const port = 80;
const path = require('path')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactAcademy');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

app.get("/", (req,res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get("/contact", (req,res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.get("/about", (req,res)=>{
    const params = { }
    res.render('about.pug', params);
})

app.post("/contact", (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    })
})

// app.get("/ind", (req,res)=>{
//     const params = { }
//     res.render('ind.html', params);
// })




app.listen(port, ()=>{
    console.log(`the application started successfully on port ${port}`)
})