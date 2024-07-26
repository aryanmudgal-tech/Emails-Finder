import express from "express";
import axios, { AxiosError } from "axios";
import tomba from "tomba"
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv";
import session from "express-session";
import { Strategy } from "passport-local";
import passport from "passport";

// Initiate app
const app=express();
const port=3000;
const saltRounds=5;
env.config();

app.use(session({
    secret: "topsecret",
    resave: false,
    saveUninitialized:true
}))



app.use(express.static("public"))

//Body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
  
db.connect();


const APIKEY=process.env.API_Key;
const secret=process.env.API_Secret;



let client = new tomba.Client();

let finder = new tomba.Finder(client);

client
  .setKey(APIKEY) // Your Key
  .setSecret(secret); // Your Secret

app.get("/", async(req, res)=>{
    res.render("landing.ejs")
    

})

app.get("/login", async(req,res)=>{
    res.render("login.ejs")
})

app.get("/register", async(req,res)=>{
    res.render("register.ejs")
})

app.get("/final", async(req,res)=>{
    if(req.isAuthenticated()){
        res.render("index.ejs")
    }else{
        res.redirect("/login")
    }
})

app.get("/logout", async(req,res)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }res.redirect("/")
    })
})

app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/final",
      failureRedirect: "/login",
    })
  );

app.post("/register", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    const result = await db.query("select * from credentials where username=($1)",[username])
    try{
        if(result.rows.length>0){
            res.send("username already exists. Try loggin in.")
        }else{
            bcrypt.hash(password, saltRounds, async (err, hash)=>{
                if(err){
                    console.log("error generating hash")
                }else{
                    console.log("hashed pwd:", hash)
                    await db.query("insert into credentials(username, password) values($1,$2)", 
                        [username, hash]);
                    res.render("index.ejs")
                }
            });
            
        }
    }catch(err){
        res.send(err)
    }
    
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
        res.send(err.response.errors.message)
        console.log(err);
    });
    
})

passport.use(
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await db.query("SELECT * FROM credentials WHERE username = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user);
              } else {
                //Did not pass password check
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

//Listen to Port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


// mohamed
// ben rebia