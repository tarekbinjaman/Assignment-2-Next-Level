import { pool } from "../../config/db";

const createBooking = async (Payload: Record<string, unknown>) => {
  console.log("Payload>>>>>>>>>>>>", Payload);
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = Payload;
  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );
  console.log(vehicleResult);
  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const { vehicle_name, daily_rent_price } = vehicleResult.rows[0];
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const numberOfDays = timeDifference / (1000 * 60 * 60 * 24);
  if (numberOfDays <= 0) {
    throw new Error("rent_end_date must be after rent_start_date");
  }

  // price calculation
  const total_Price = numberOfDays * daily_rent_price;
  const status = "active";
  const bookngResult = await pool.query(
    `
    INSERT INTO bookings 
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_Price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_Price,
      status,
    ]
  );
  return {
    ...bookngResult.rows[0],
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  };
};

const getBookingsByAdmin = async () => {
  const result = await pool.query(`
    SELECT
    b.id
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.total_price,
    b.tatus,

    u.name As customer_name,
    u.eamil as customer_email,,

    v.vehicle_name,
    v.registration_number

    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    ORDER BY b.created_at DESC;
    `);

  return result.rows;
};

export const bookingService = {
  createBooking,
  getBookingsByAdmin
};
