const mongoose = require("mongoose");

//Company Schema
const companySchema = mongoose.Schema({
    companyId : String,
    name : String,
    productIds :  [{
        type:String
    }]
});

const companyModel = mongoose.model("company",companySchema,"company");
module.exports = companyModel;