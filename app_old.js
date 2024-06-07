const express = require("express");
const mongoose = require("mongoose");

const app=express();
app.use(express.json());

// connect to mongodb
mongoose.connect('mongodb+srv://nasrinsalika:nasrin%402024@nasrincluster.lsa0kov.mongodb.net/crud')

// Moongoose schema

const UserSchema = new mongoose.Schema({
    name: String,
    size: Number,
    id: Number,
})   

// Moongoose model
const UserModel = mongoose.model("users", UserSchema);

app.get('/', (req, res) => {
    return res.json({ status:200, message: "Server running at " + process.env.PORT })
})

// get method

app.get("/getUsers", (req,res) => {
    UserModel.find({}).then(function(users) {
        res.json(users);
    }).catch(function(err) {
        console.log(err);
    })
})

// post method

app.post("/getUsers", async (req,res) => {
    console.log("inside post function");

    const data = new UserModel({
        name:req.body.name,
        size:req.body.size,
        id:req.body.id
    });

    await data.save();
    res.send("posted");
})
 
// put method

app.put("/updateUser/:id", async (req, res) => {
    
    const updateId = req.params.id;
    const updateName = req.body.name;
    const updateSize = req.body.size;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { id: updateId },
            { $set: { name: updateName, size: updateSize } },
            { new: true }
        );

        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

// delete method

app.delete("/deleteUser/:id", async (req, res) => {
    const deleteId = req.params.id;

    try {
        const deletedUser = await UserModel.findOneAndDelete({ id: deleteId });

        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
     console.log("Server is Running")
    })

    // {
    //     "version": 2, 
    //     "rewrites": [
    //         { "source": "/(.*)", "destination": "/" }
    //     ]
    // }




    // const express = require("express");
    // const mongoose = require("mongoose");
    
    // const app=express();
    // app.use(express.json());
    
    // // connect to mongodb
    // mongoose.connect('mongodb+srv://nasrinsalika:nasrin%402024@nasrincluster.lsa0kov.mongodb.net/crud')
    
    // // Moongoose schema
    
    // const UserSchema = new mongoose.Schema({
    //     name: String,
    //     size: Number,
    //     id: Number,
    // })   
    
    // // Moongoose model
    // const UserModel = mongoose.model("users", UserSchema);
    
    // // get method
    
    // app.get("/getUsers", (req,res) => {
    //     UserModel.find({}).then(function(users) {
    //         res.json(users);
    //     }).catch(function(err) {
    //         console.log(err);
    //     })
    // })
    
    // // post method
    
    // app.post("/getUsers", async (req,res) => {
    //     console.log("inside post function");
    
    //     const data = new UserModel({
    //         name:req.body.name,
    //         size:req.body.size,
    //         id:req.body.id
    //     });
    
    //     await data.save();
    //     res.send("posted");
    // })
     
    // // put method
    
    // app.put("/updateUser/:id", async (req, res) => {
        
    //     const updateId = req.params.id;
    //     const updateName = req.body.name;
    //     const updateSize = req.body.size;
    
    //     try {
    //         const updatedUser = await UserModel.findOneAndUpdate(
    //             { id: updateId },
    //             { $set: { name: updateName, size: updateSize } },
    //             { new: true }
    //         );
    
    //         if (updatedUser) {
    //             res.json(updatedUser);
    //         } else {
    //             res.status(404).send("User not found");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send("Internal Server Error");
    //     }
    // });
    
    // // delete method
    
    // app.delete("/deleteUser/:id", async (req, res) => {
    //     const deleteId = req.params.id;
    
    //     try {
    //         const deletedUser = await UserModel.findOneAndDelete({ id: deleteId });
    
    //         if (deletedUser) {
    //             res.json(deletedUser);
    //         } else {
    //             res.status(404).send("User not found");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send("Internal Server Error");
    //     }
    // });
    
    // app.listen(3000, () => {
    //      console.log("Server is Running")
    //     })
    
    
// const express = require("express");

// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
