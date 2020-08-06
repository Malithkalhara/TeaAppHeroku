const express = require('express');
const router = express.Router();

const suppler = require('../models/Suppler.model');

//view
router.get('/view',(req,res)=>{
    suppler.find()
        .then(mySuppler=>{
            res.status(200).json({data:mySuppler});
        })
        .catch(err=>{
            res.status(400).send(err);
        })
});

//Load
router.get('/load',(req,res)=>{
    suppler.find({IsDeleted:false,ExpiryDate:null})
        .then(mySuppler=>{
            res.status(200).json({data:mySuppler});
        })
        .catch(err=>{
            res.status(400).send(err);
        })
});



//Add suppler
router.post('/add',function(req,res){

    var newsuppler = new suppler(req.body);  

    newsuppler.save()
        .then(mySuppler=>{
            res.status(200).json({status:true,msg:"suppler  Add Succssfully!"});
        })
        .catch(err=>{
            res.status(400).send("Unable to Save the Database!");
        });
});


//delete
router.post('/onDelete',(req,res)=>{
    
    suppler.findOneAndUpdate(
        {_id:req.body._id},
        { $set:{IsDeleted:true,ExpiryDate:new Date()}},
        {new:true})
    .then(mysuppler=>{
        res.status(200).json({status:true,msg:"suppler Delete Succssfully!"});
    })
    .catch(err=>{
        res.status(400).send(err);
        console.log(err);
    });
});


//Delete  active
router.post('/onActive',function(req,res){
    
    suppler.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mySuppler=>{
            res.status(200).json({status:true,msg:"suppler Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});




module.exports = router;

