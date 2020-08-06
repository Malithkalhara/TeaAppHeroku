const express = require('express');
const router = express.Router();

const supplerInvoice = require('../models/SupplerInvoice.model');

//view 
router.get('/view',(req,res)=>{
    supplerInvoice.find()
     .then( mysupplerInvoice =>{
         res.status(200).json({data:mysupplerInvoice})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load supplerInvoice 
router.get('/load',(req,res)=>{
    supplerInvoice.find({IsDeleted:false,ExpiryDate:null})
     .then( mysupplerInvoice=>{
         res.status(200).json({data:mysupplerInvoice})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Add supplerInvoice
router.post('/add',function(req,res){

    var newsupplerInvoice = new supplerInvoice(req.body);  

    newsupplerInvoice.save()
        .then(mysupplerInvoice=>{
            res.status(200).json({status:true,msg:"suppler Invoice  Add Succssfully!"});
        })
        .catch(err=>{
            res.status(400).send("Unable to Save the Database!");
        });
});

//delete 
router.post('/onDelete',function(req,res){
    
    supplerInvoice.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(mysupplerInvoice=>{
            res.status(200).json({status:true,msg:"suppler Invoice Delete Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

//Delete  active
router.post('/onActive',function(req,res){
    
    supplerInvoice.findOneAndUpdate(
            {_id:req.body._id},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(mysupplerInvoice=>{
            res.status(200).json({status:true,msg:"suppler Invoice Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

module.exports = router;