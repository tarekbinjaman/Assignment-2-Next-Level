import { Request, Response } from "express";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingService.createBooking({...req.body, customer_id: req.user!.id});
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      const bookings = await bookingService.getBookingsByAdmin();
      const formatted = bookings.map((b) => ({
        id: b.id,
        customer_id: b.customer_id,
        vehicle_id: b.vehicle_id,
        rent_start_date: b.rent_start_date,
        rent_end_date: b.rent_end_date,
        total_price: b.total_price,
        status: b.status,
        customer: {
          name: b.customer_name,
          email: b.customer_email,
        },
        vehicle: {
          vehicle_name: b.vehicle_name,
          registration_number: b.registration_number,
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Booking retrived successfully",
        data: formatted,
      });
    }

    const bookings = await bookingService.getBookingByCustomer(req.user!.id);
    const formatted = bookings.map((b) => ({
      id: b.id,
      vehicle_id: b.vehicle_id,
      rent_start_date: b.rent_start_date,
      rent_end_date: b.rent_end_date,
      total_price: b.total_price,
      status: b.status,
      vehicle: {
        vehicle_name: b.vehicle_name,
        registration_number: b.registration_number,
        type: b.type,
      },
    }));

    return res.status(200).json({
      success: true,
      message: "Your booking retrived successfully",
      data: formatted,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingController = {
  createBooking,
  getBookings
};
