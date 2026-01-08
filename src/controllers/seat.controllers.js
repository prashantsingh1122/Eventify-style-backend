import { lockSeat } from "../services/seat.service";

async function lockSeatHandler(req,res) {
    const { userID,seatId}=req.body;

    try{
        await lockSeat(userID, seatId); //await= wait for service to finish
        //Controller: "Hey service, lock seat 5 for user 1"
//      Service: Does all the database work (BEGIN, SELECT, INSERT, COMMIT)
        res.status(200).json({message:"Seat locked successfully"});
    } catch (error) {
        res.status(400).json({error: error.message});

    }
}
module.exports={lockSeatHandler};