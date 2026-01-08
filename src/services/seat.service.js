const pool = require("../db");

async function lockSeat(userId, seatId) {
    const client = await pool.connect();

    try {
        await client.query("Begin");
        //Check if seat is already booked 
        const seatResult = await client.query(
            "Select is_booked FROM seats WHERE id = $1 FOR UPDATE",
            [seatId]
        );

        if (seatResult.rows.length === 0) {
            throw new Error("Seat not found");
        }
        if (seatResult.rows[0].is_booked) {
            throw new Error("Seat already booked");
        }
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); //15 minutes from now

        await client.query(
            `INSERT INTO seat_locks (user_id, seat_id, expires_at)
        VALUES ($1,$2,$3)`,
            [userId, seatId, expiresAt]
        );
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        // Unique constraint voilation indicates seat is already locked
        if (error.code === "23505") {
            throw new Error("Seat is already locked");
        }
        throw error;
    } finally {
        client.release();
    }

}
module.exports = { lockSeat };
