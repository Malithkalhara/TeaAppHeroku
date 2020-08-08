const express = require('express');
const router = express.Router();

const artical = require('../models/Artical.model');

//add
router.post('/add',function(req,res){

    artical.find({
        categoryID:req.body.categoryID,
        articalName:req.body.articalName,
        volume:req.body.volume,
        buyPrice:req.body.buyPrice,
        sellPrice:req.body.sellPrice,
        minSalQty:req.body.minSalQty,
        buying:req.body.buying,
        selling:req.body.selling
    }).exec((err,docs)=>{
        if(docs.length){
            res.status(200).json({status:false,msg:" Artical Already Added ! "});
       }
       else{
        var newArtical = new artical(req.body);  

        newArtical.save()
            .then(data =>{
                res.status(200).json({status:true,msg:"Artical Added Succssfully!"});
            })
            .catch(err=>{
                res.status(400).send("Unable to Save the Database!");
            });
       }
    })
   
});

//view
router.get('/view',(req,res)=>{
    artical.find()
     .then( myArtical =>{
         res.status(200).json({data:myArtical})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load
router.get('/load',(req,res)=>{
    artical.find({IsDeleted:false,ExpiryDate:null})
     .then( myArtical =>{
         res.status(200).json({data:myArtical})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//delete Artical
router.post('/onDelete',function(req,res){
  
    artical.findOneAndUpdate(
            {_id:req.body.ArticalID},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(myArtical=>{
            res.status(200).json({status:true,msg:"Artical Deleted Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});


//Delete Artical active
router.post('/onActive',function(req,res){
    
    artical.findOneAndUpdate(
            {_id:req.body.ArticalID},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(myArtical=>{
            res.status(200).json({status:true,msg:"Artical Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});


module.exports = router;

