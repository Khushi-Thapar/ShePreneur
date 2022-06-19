const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const express = require("express");
const app=express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/azureDB",{useNewUrlParser: true});
const azureLoginSchema = {
  passw: String,
  email:String

  };

const azureLoginData = mongoose.model("azureLoginData", azureLoginSchema);

app.get("/",function(req,res){
  res.render("index")
})



app.get("/govtSchemes",function(req,res){

// Write Headers
writeStream.write(`Title,Link,Date \n`);

request('https://www.godigit.com/guides/government-schemes/women-empowerment-schemes-in-india', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    var arr = new Array()

    $('.content-info-list').each((i,el)=>{
        const titles = $(el).text();
        arr.push(titles);
        console.log(titles)
    })

    res.render("pageFinal",{
      arr:arr
    })

    console.log('Scraping Done...');
  }});

});

app.get("/seeJobs",function(res,req){
  res.render("")
})
app.get("/seeShops",function(res,req){
  res.render("")
})
app.get("/funds",function(res,req){
  res.render("")
})

app.get("/login",function(req,res){
  res.render("")
})
// app.post("/login",function(req,res){
//   const pass = req.body.pass;
//   const em=req.body.ema;
  
// azureLoginData.findOne({email:em}).then(j=>{
//       if(j){
//           //alert("Email already exists");
//           console.log("Email already exists");
//           res.redirect("/error");
//       }
//       else{

//           const i= new employeeData({
//               first_name:fname,
//               last_name:lname,
//               address: add,
//               post: pst,
//               email:em
//           });
//           i.save();
//           res.redirect("/employee");

//       }
//   })
// })



app.listen(3000,function(req,res){
    console.log(" server ported from 3000...");
})
