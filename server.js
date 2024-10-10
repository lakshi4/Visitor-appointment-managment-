const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
const app=express();
require("dotenv").config();

const PORT=process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false
})
const connection=mongoose.connection;

connection.once(`open`, () => {
    console.log(`MongoDB Connection Success!!!`)
  })

  const appointmentRouter = require("./routes/appointment.js");

  app.use("/appointment", appointmentRouter);
 
  app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});