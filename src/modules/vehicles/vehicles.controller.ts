import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getVehicles();
    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "no vehicles found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getSingleVehicles(
      req.params.vehicleId as string
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicles = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admin can update vehicles",
    });
  }
  try {
    const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = req.body;
    const targetVehiclesId = req.params.vehicleId as string;
    const result = await vehiclesService.updateVehicles(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      targetVehiclesId
    );
    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result.rows[0]
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVehicles = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Only admin can delete vehicles",
    });
  }
  try {
    const result = await vehiclesService.deleteVehicles(req.params.vehicleId!);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles deleted successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const vehiclesController = {
  createVehicles,
  getVehicles,
  getSingleVehicles,
  updateVehicles,
  deleteVehicles
}