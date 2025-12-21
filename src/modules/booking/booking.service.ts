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
  const total_price = numberOfDays * daily_rent_price;
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
      total_price,
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
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.total_price,
    b.status,
    u.name As customer_name,
    u.email as customer_email,

    v.vehicle_name,
    v.registration_number

    FROM bookings b
    JOIN users u ON b.customer_id = u.id
    JOIN vehicles v ON b.vehicle_id = v.id
    ORDER BY b.created_at DESC;
    `);

  return result.rows;
};

const getBookingByCustomer = async (CustomerId: string) => {
  const result = await pool.query(`
    SELECT
      b.id,
      b.vehicle_id,
      b.rent_start_date,
      b.rent_end_date,
      b.total_price,
      b.status,

      v.vehicle_name,
      v.registration_number,
      v.type

      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
    WHERE b.customer_id = $1
    ORDER BY b.created_at DESC;
    `, [CustomerId])
    return result.rows
}

const updateBookingStatus = async(bookingId: number, status: string, user: any) => {
  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
  if(bookingResult.rowCount === 0) throw new Error("Booking not found");
  const booking = bookingResult.rows[0];

  // so only customer can cancel their own booking
  if(status === "cancelled" && booking.customer_id !== user.id) {
    throw new Error("You can only cancel your own booking");
  }

  // now update booking status 
  const updateResult = await pool.query(
        `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  const updatedBooking = updateResult.rows[0];


  // if admin marked returned then the availability of that vehicles will be update in vehicles row
  if(status === "returned") {
    await pool.query(
      `
      UPDATE vehicles SET availability_status='available' WHERE id=$1
      `,
      [booking.vehicle_id]
    );
    updatedBooking.vehicle = {availability_status: "available"};
  }

  return updatedBooking;
}

export const bookingService = {
  createBooking,
  getBookingsByAdmin,
  getBookingByCustomer,
  updateBookingStatus
};
