const express = require("express");
const sellerModel = require("../models/sellerData");
const productModel = require("../models/productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:["seller page"]});
});

//company List
router.get("/list", async (req,res) => {
    const sellerList = await sellerModel.find({} , { name: true });
  
    if(sellerList.length === 0){
      return res.json({ data: "No record in seller"});
    }
    return res.json({data: sellerList});
});

//Add Seller
router.post("/addSeller",(req,res) => {
    const { newSeller } = req.body;
    sellerModel.create(newSeller);
    return res.json({ data:"Added Seller Succesfully"});
});

//fetch seller details based on product name
router.post("/fetchSeller", async (req,res)=>{
    const product_name = req.body.title;
    const seller = await productModel.findOne({title:product_name});
    //return res.json({data:comapny});
    const seller_id = seller.sellerId;
    const sell = await sellerModel.findOne({sellerId:seller_id});
    return res.json({data:seller});
});

//update Seller
router.put("/updateSeller/:id", async(req,res) => {
    const sid = req.params.id;
    const sname = req.body.name;
    const seller = await sellerModel.findOneAndUpdate({seller_id:sid},{name:sname},{new:true});
    return res.json({result:"Updated Seller Succesfully",seller});
});

//delete Seller
router.post("/deleteSeller/:id", async (req,res)=>{
    const sid = req.params.id;
    const seller = await sellerModel.findOneAndDelete({seller_id:sid});
    return res.json({result:"Deleted Seller Succesfully",seller});
});

module.exports = router;