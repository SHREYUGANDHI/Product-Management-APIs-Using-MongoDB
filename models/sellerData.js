const mongoose = require("mongoose");

//seller Schema
const sellerSchema = mongoose.Schema({
    sellerId : String,
    name : String,
    productIds : [{
        type:String
    }]
});

const sellerModel = mongoose.model("seller",sellerSchema,"seller");
module.exports = sellerModel;