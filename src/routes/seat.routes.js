const express = require("express");
const router = express.Router();
const { lockSeatHandler}= require("../controllers/seat.controllers");

router.post("/lock-seat", lockSeatHandler);
router.post("/confirm-seat-booking", confirmSeatBookingHandler);
module.exports=router;  
//Exports the router so app.js can use it
