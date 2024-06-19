const express = require("express");
const dontenv = require("dotenv")
const cors = require("cors");
const app = express()


dotenv.config();

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));


const mongoose = require("mongoose")
require('dotenv').config();


app.use(express.json());

mongoose.connect(process.env.MONGODB_CONNECT_URL)
.then(() => console.log("mongodb connected"))
.catch((error) => console.log(error));



const UserSchema = new mongoose.Schema({
    name: String,
    size: Number,
    price: Number,
    id: Number,
})   


const UserCrud = mongoose.model("crud", UserSchema);



app.get("/crud",async (req,res) => {
    UserCrud.find({}).then(function(crud) {
        res.json(crud);
    }).catch(function(err) {
        console.log(err);
    })
})

app.get("/crud/:id", async(req, res) =>{
    let id = req.params.id;
    UserCrud.findById(id).then(function(crud) {
        res.json(crud)
    }).catch(function(err) {
        console.log(err);
    })
})

// post method

app.post("/crud", async (req,res) => {
    console.log("Inside Post Function");

    const data = new UserCrud({
        name:req.body.name,
        size:req.body.size,
        price:req.body.price,
        id:req.body.id
    });

    await data.save();
    res.send("posted");
})

// put method

app.put("/updateCrud/:id", async (req, res) => {
    
    const updateId = req.params.id;
    const updateName = req.body.name;
    const updateSize = req.body.size;
    const updatePrice = req.body.price;

    try {
        const updateCrud = await UserCrud.findOneAndUpdate(
            { id: updateId },
            { $set: { name: updateName, size: updateSize, price: updatePrice} },
            { new: true }
        );

        if (updateCrud) {
            res.json(updateCrud);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// delete method

app.delete("/deleteCrud/:id", async (req, res) => {
    const deleteId = req.params.id;

    try {
        const deleteCrud = await UserCrud.findOneAndDelete({ id: deleteId });

        if (deleteCrud) {
            res.json(deleteCrud);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});


// app.listen(3000, () => {
//     console.log("Server is Running")
//    })

app.listen(process.env.PORT, () => {
    console.log("server runs on 3000")
})



