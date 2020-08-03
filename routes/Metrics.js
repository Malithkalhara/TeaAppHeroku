const express = require('express');
const router = express.Router();

const metric = require('../models/metrics.model');

router.get('/view',(req,res)=>{
    metric.find()
     .then( myMetric =>{
         res.status(200).json({data:myMetric})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

//Load Metrics 
router.get('/load',(req,res)=>{
    metric.find({IsDeleted:false,ExpiryDate:null})
     .then( myMetric =>{
         res.status(200).json({data:myMetric})
     })
     .catch(err=>{
         res.status(400).send(err);
     })
});

router.post('/addmetrics',function(req,res){

    var newMetrics = new metric(req.body);  

    newMetrics.save()
        .then(myMetrics=>{
            res.status(200).json({status:true,msg:"Metrics Add Succssfully!"});
        })
        .catch(err=>{
            res.status(400).send("Unable to Save the Database!");
        });
});

router.post('/onDelete',function(req,res){
    
    metric.findOneAndUpdate(
            {_id:req.body.metricsID},
            { $set:{IsDeleted:true,ExpiryDate:new Date()}},
            {new:true})
        .then(myMetrics=>{
            res.status(200).json({status:true,msg:"Metrics Delete Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

router.post('/onActive',function(req,res){
    
    metric.findOneAndUpdate(
            {_id:req.body.metricsID},
            { $set:{IsDeleted:false,ExpiryDate:null}},
            {new:true})
        .then(myMetrics=>{
            res.status(200).json({status:true,msg:"Metrics Active Succssfully!"});
            console.log("true");
        })
        .catch(err=>{
            res.status(400).send(err);
            console.log(err);
        });
});

module.exports = router;