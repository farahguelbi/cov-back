const express = require('express')
const mongoose = require('mongoose')
const morgan = require ('morgan')
const bodyParser = require('body-parser')

require('dotenv').config();


const app = express()
const cors = require('cors')
app.use(cors()); 

// Routes
const AuthRoute = require ('./routers/Auth')
const rideRoutes = require("./routers/rideRoutes");
const vehicleRoutes = require("./routers/vehicleRoutes");


// Middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/uploads/images", express.static("uploads/images"));


const Host = process.env.IP_ADDRESS || '0.0.0.0'; 
                                                                                                                                                                                                         
// MongoDB connection
  mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));





  app.use('/api', AuthRoute);
  app.use("/api/rides", rideRoutes);
  app.use("/api/vehicles", vehicleRoutes);







  app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Something went wrong!');
  });
  
  

  app.listen(5000, Host, () => {
    console.log('Server is running on http://0.0.0.0:5000');
  });