import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import users from "./routes/user.mjs";  //Don't forget
import https from "https";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const cert = process.env.CERT;
const key = process.env.PRIVAT_KEY
console.log(cert + " CERT AND KEY " + key)

const options = {
 key: fs.readFileSync(key),
 cert: fs.readFileSync(cert),
  }

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/user", users);


let server = https.createServer(options,app)

app.get('/record',(req,res)=>{
 // res.send('HTTPS in ExpressJS')
 console.log(res)
})

// start the Express server  //change app to server
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});