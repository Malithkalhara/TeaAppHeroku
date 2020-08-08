const mongoose = require('mongoose');
const { find } = require('./ArticalCategory.model');

const schema = mongoose.Schema;

const MetricsShema = new schema({
   
    Measure:{type:String},
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('Metrics',MetricsShema);


function jsonParser(stringValue) {

    var string = JSON.stringify(stringValue);
    var objectValue = JSON.parse(string);
    console.log(objectValue['metricsID'])
    return objectValue['metricsID'];
 }

module.exports.findMetricsWithID = function findMetricsWithID(myArtical){

    console.log(myArtical.metricsID);
    console.log(myArtical["metricsID"]);
    // find({Measure:req.body.metricsID,IsDeleted:false,ExpiryDate:null})
    //     .then(myMetrics=>{
    //         console.log(myMetrics);
    //     })
}