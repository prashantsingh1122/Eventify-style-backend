CLIENT                  APP.JS              ROUTES              CONTROLLER          SERVICE
  |                      |                    |                    |                   |
  |-- POST /api/lock-seat -->                                      
  |                      |
  |                      |-- Matches "/api" prefix
  |                      |
  |                      |-- Passes to seatRoutes
  |                      |                    |
  |                      |                    |-- Matches "/lock-seat"
  |                      |                    |
  |                      |                    |-- Calls lockSeatHandler
  |                      |                    |                    |
  |                      |                    |                    |-- Extracts userID, seatId
  |                      |                    |                    |
  |                      |                    |                    |-- Calls lockSeat()
  |                      |                    |                    |                   |
  |                      |                    |                    |                   |-- Database work
  |                      |                    |                    |                   |-- BEGIN, SELECT, INSERT
  |                      |                    |                    |                   |-- COMMIT/ROLLBACK
  |                      |                    |                    |<-- Returns result
  |                      |                    |                    |
  |                      |                    |                    |-- Sends JSON response
  |                      |                    |<-- Response
  |<-- JSON (status 200/400) --