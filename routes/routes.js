const bcrypt = require('bcryptjs');
const express = require('express');
const Model = require('../models/model');
const Item = require('../models/item')
const jwt = require('jsonwebtoken')
const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    
    try {
        const userExist = await Model.findOne({name:req.body.name})
        if(userExist)
        {
            // console.log(userExist.password)
            return res.status(422).json({error:"user name is already exit"});
        }
        const data = new Model({
            name: req.body.name,
            age: req.body.age,
            password:req.body.password
        })
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/post/item', async (req, res) => {
    
    try {
        // const userExist = await Model.findOne({name:req.body.name})
        // if(userExist)
        // {
        //     // console.log(userExist.password)
        //     return res.status(422).json({error:"user name is already exit"});
        // }
        const data = new Item({
            name: req.body.name,
            title: req.body.title,
            price:req.body.price
        })
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post('/signin', async (req, res) => {
    const {name,password}=req.body;
    try {
        const userExist = await Model.findOne({name:name})
        if(userExist)
        {
            // console.log(userExist.password)
            const ismatch= await bcrypt.compare(password,userExist.password);
            if (ismatch) {
                const token = await userExist.generateAuthToken();
                console.log(token)
                res.cookie("jwt_web_token",token,{
                    expires:new Date(Date.now()+258920000),
                    httpOnly:true
                })
                // console.log(ismatch)
                res.status(200).json({user:"login successfull"})
            } else {
                res.json({error:"password did'nt match"});
            }
        }
        else{
            res.json({user:"invalid user"});
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.patch('/changepwd/:id', async (req, res) => {
    const {oldpwd,newpwd}=req.body;
    try {
        const _id = req.params.id;
        console.log(_id)
        const userExist = await Model.findById(_id);
        console.log(userExist)
        const ismatch= await bcrypt.compare(oldpwd,userExist.password);
        if (ismatch) {
            console.log(ismatch);
            const newpwd2 = await bcrypt.hash(newpwd,12);
            Model.findByIdAndUpdate(_id,{password:newpwd2},{
                new:true
            })
            .then(result =>{
                console.log(result)
                // res.status(200).send(result)
                 res.status(200).json({result: "password changes successfully"})
                
            })
            .catch(err=>{
                res.json("error is",err)
            })
        } else {
            res.json({error:"password did'nt match"});
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get all Method
router.get('/getAll', async(req, res) => {
    const allData= await Model.find()
    res.send(allData)
})
router.get('/getAll/item', async(req, res) => {
    const allData= await Item.find()
    res.send(allData)
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    const allData3= await Model.findById(req.params.id);
    res.send(allData3);
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})


module.exports = router;