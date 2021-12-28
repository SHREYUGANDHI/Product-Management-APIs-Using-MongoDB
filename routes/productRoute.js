const express = require("express");
const productModel = require("../models/productData");
const companyModel = require("../models/companyData");
const sellerModel = require("../models/sellerData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:["Product Page"]});
});

router.get("/list",(req,res) => {
    if(productModel.length === 0){
        return res.json({ data: "Product Empty"});
    }
    return res.json({data:productModel});
});

//add Product
router.post("/addProduct",(req,res) => {
    const { newProduct } = req.body;
    productModel.create(newProduct);
    return res.json({ data:"Added Product Succesfully"});    
});

//fetch all products of a company
router.post("/fetchProductsOfCompany",async(req,res)=>{
    const company_name = req.body.name;
    const company = await companyModel.findOne({name:company_name});

    const productid = company.productIds;
    const product_length = productid.length;
    var product_arr = [];
    i=0;
    j=0;
    if(product_length>1)
    {
        while (j<product_length) {
            product_arr[j] = await productModel.findOne({product_id:productid[j]});
            console.log(product_arr[j]);
            j+=1;
            i+=1;
        }
        return res.json({data:product_arr});
    }
    else
    {
        product_arr[j] = await productModel.findOne({product_id:productid[j]});
        console.log(product_arr[j]);
        return res.json({data:product_arr});
    }
});

//fetch all products of a seller
router.post("/fetchProductsOfSeller",async(req,res)=>{
    const seller_name = req.body.name;
    const seller = await sellerModel.findOne({name:seller_name});
    const productid = seller.productIds;
    const product_length = productid.length;
    var product_arr = [];

    i=0;
    j=0;
    if(product_length>1)
    {
        while (j<product_length) {
            product_arr[j] = await productModel.findOne({product_id:productid[j]});
            j+=1;
            i+=1;
        }
    return res.json({data:product_arr});
    }
    else
    {
    product_arr[j] = await productModel.findOne({product_id:productid[j]});
    return res.json({data:product_arr});
    }   
});

//update product
router.put("/updateProduct/:id", async (req,res)=>{
    const pid = req.params.id;
    const ptitle = req.body.name;
    const prod = await productModel.findOneAndUpdate({product_id:pid},{title:ptitle},{new:true});
    return res.json({result:"Updated Product Succesfully",product_details:prod});
});

//delete product
router.post("/deleteProduct/:id", async (req,res)=>{
    const pid = req.params.id;
    const product = await productModel.findOneAndDelete({product_id:pid});
    return res.json({result:"Deleted Product Succesfully",product});
});

module.exports = router;