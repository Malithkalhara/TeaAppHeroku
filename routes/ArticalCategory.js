const express = require('express');
const router = express.Router();

const artical = require('../models/ArticalCategory.model');

router.post('/add',function(req,res){

    var newArtical = new artical(req.body);  

    newArtical.save()
        .then(data =>{
            res.status(200).json({status:true,msg:"Metrics Add Succssfully!"});
        })
        .catch(err=>{
            res.status(400).send("Unable to Save the Database!");
        });
});

router.get('/view',(req,res)=>{
    artical.find()
     .then( myArtical =>{
         res.status(200).json({data:myArtical})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});




module.exports = router;