const { lockSeat }= require("../services/seat.service");

async function lockSeatHandler(req,res) {
    const { userId, seatId}=req.body;

    try{
        await lockSeat(userId, seatId); //await= wait for service to finish
        //Controller: "Hey service, lock seat 5 for user 1"
//      Service: Does all the database work (BEGIN, SELECT, INSERT, COMMIT)
        res.status(200).json({message:"Seat locked successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});

    }
}
async function confirmSeatBookingHandler(req,res){
    const {userId, seatId}= req.body;
    try{
        await confirmSeatBooking(userId, seatId);
        res.status(200).json({message:"Seat booking confirmed successfully"});
    } catch (error){
        res.status(500).json({error: error.message});
    }
}
module.exports={lockSeatHandler, confirmSeatBookingHandler};