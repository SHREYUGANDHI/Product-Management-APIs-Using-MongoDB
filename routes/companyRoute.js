const express = require("express");
//const company = require("../models/companyData");
const companyModel = require("../models/companyData");
const productModel = require("../models/productData");
const router = express.Router();
router.use(express.json());

router.get("/",(req,res) => {
    res.json({data:"company page"});
});

//company List
router.get("/list", async (req,res) => {
    const compList = await companyModel.find({} , { name: true });
  
    if(compList.length === 0){
      return res.json({ data: "no record in Company"});
    }
    return res.json({data: compList});
});

//add Company
router.post("/addCompany",(req,res) => {
    const { newCompany } = req.body;
    companyModel.create(newCompany);
    return res.json({ data:"Added Company name Succesfully"});
    
});

//fetch Company
router.post("/fetchCompany", async (req,res)=>{
    const product_name = req.body.title;
    const comapny = await productModel.findOne({title:product_name});
    //return res.json({data:comapny});
    const company_id = comapny.companyId;
    const company = await companyModel.findOne({companyId:company_id});
    return res.json({data:company});
});

//update company
router.put("/updateCompany/:id", async(req,res) => {
    const cid = req.params.id;
    const cname = req.body.name;
    const company = await companyModel.findOneAndUpdate({company_id:cid},{name:cname},{new:true});
    return res.json({result:"Updated Succesfully",company:company});
   
});

//delete company
router.post("/deleteCompany/:id", async (req,res)=>{
    const cid = req.params.id;
    const company = await companyModel.findOneAndDelete({company_id:cid});
    return res.json({result:"Deleted Succesfully",company});
});

module.exports = router;