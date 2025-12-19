import { pool } from "../../config/db";

const createBooking = async (Payload: Record<string, unknown>) => {
  console.log("Payload>>>>>>>>>>>>", Payload);
  const { customer_id,
     vehicle_id,
      rent_start_date,
       rent_end_date } = Payload;
       const vehicleResult = await pool.query(
         `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
         [vehicle_id]
       );
       console.log(vehicleResult)
};


export const bookingService = {
  createBooking,
};
