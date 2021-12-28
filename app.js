//require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");

const companyRoute = require("./routes/companyRoute");
const sellerRoute = require("./routes/sellerRoute");
const productRoute = require("./routes/productRoute");

mongoose
  //.connect(process.env.MONGOURL)
  .connect("mongodb+srv://mcauser:<password>@mca.jwdpx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(() => console.log("mongo db connected"));

app.get('/', (req, res) => res.send('Welcome to product management!!!!'));
app.use("/company", companyRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);

app.listen(port, () => console.log(`App listening on port port!`));