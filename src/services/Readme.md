docker exec -it seatsafe-db psql -U postgres -d seatsafe



. Check Database State Directly
-- Check all available seats
SELECT id, is_booked FROM seats;

-- Check which seats are locked
SELECT user_id, seat_id, expires_at FROM seat_locks;

-- Check if a specific seat is locked
SELECT * FROM seat_locks WHERE seat_id = 5;

-- Check if a lock has expired
SELECT * FROM seat_locks WHERE expires_at < NOW();