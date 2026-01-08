const express = require("express");
const router = express.Router();
const { lockSeatHandler}= require("../controllers/seat.controllers");

router.post("/lock-seat", lockSeatHandler);

module.exports=router;  
//Exports the router so app.js can use it
