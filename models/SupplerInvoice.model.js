const mongoose = require('mongoose');
const schema = mongoose.Schema;

const supplerInvoiceSchema = new schema({

    articalCategoryID:String,
    articalID:String,
    supplerID:String,
    orderNumber:String,
    invoiceNumber:String,
    totalPrice:Number,
    quantity:Number,
    comment:String,
    buying:Boolean,
    selling:Boolean,
    CreationDate:{type:Date,default:Date.now},
    ModificationDate:{type:Date,default:null},
    IsDeleted:{type:Boolean,default:false},
    ExpiryDate:{type:Date,default:null}
});

module.exports = mongoose.model('SupplerInvoice',supplerInvoiceSchema);