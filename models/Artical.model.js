const mongoose = require('mongoose');
const schema = mongoose.Schema;

const articalSchema = new schema({

    categoryID:String,
    metricsID:String,
    articalName:String,
    volume:String,
    buyPrice:Number,
    sellPrice:Number,
    minSalQty:Number,
    comment:String,
    buying:Boolean,
    selling:Boolean,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}

});

module.exports = mongoose.model('Artical',articalSchema);