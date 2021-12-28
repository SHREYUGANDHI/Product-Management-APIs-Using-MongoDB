const mongoose = require("mongoose");

//Product Schema
const productSchema = mongoose.Schema({
    productId : String,
    title : String,
    price : String,
    category : [{
        type:String
    }],
    companyId : String,
    sellerId : [{
        type:String
    }]
});

const productModel = mongoose.model("product",productSchema,"product");
module.exports = productModel;
