import express from "express";
import axios from "axios";
import tomba from "tomba"
import bodyParser from "body-parser";

// Initiate app
const app=express();
const port=3000;

// API Key
// Sign in to https://app.tomba.io/
// Make your APIKEY and Secret on TOMBA
const APIKEY="YOUR KEY";
const secret="YOUR SECRET";


// For assets
app.use(express.static("public"))

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));


let client = new tomba.Client();

let finder = new tomba.Finder(client);

client
  .setKey(APIKEY) // Your Key
  .setSecret(secret); // Your Secret

app.get("/", async(req, res)=>{
    res.render("index.ejs")
    

})

app.post("/get-email", async(req,res)=>{
    let domain=req.body.domain
    let fname=req.body.fname;
    let lname=req.body.lname;

    let result = finder.emailFinder(
        domain,         // Domain
        fname,         // first name
        lname         // last name
    );

    result
    .then((response) => {
        res.render("read.ejs",{
            email:response.data.email,
            full_name: response.data.full_name,
            linkedin: response.data.linkedin,
            twitter: response.data.twitter
        })

    })
    .catch((err) => {
        console.log(err);
    });
    
})

app.post("/", async (req,res)=>{
    res.render("index.ejs")
})


//Listen to Port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


// mohamed
// ben rebia