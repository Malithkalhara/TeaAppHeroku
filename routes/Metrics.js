const express = require('express');
const router = express.Router();

const metric = require('../models/metrics.model');

router.post('/addmetrics',function(req,res){

    var newMetrics = new metric(req.body);  
    
    newMetrics.save()
     .then(myMetrics=>{
         res.status(200).send("Metrics Add Succssfully!");
     })
     .catch(err=>{
         res.status(400).send("Unable to Save the Database!");
     });
});


module.exports = router;