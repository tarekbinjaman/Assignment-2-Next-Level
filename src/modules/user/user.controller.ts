import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "Data Inserted Successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.params.userId as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user fetched successfully",
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

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;
  const targetUserId = req.params.userId as string;
  const targetUserIdNumber = Number(req.params.userId as string);
  const loggedInUser = req.user!;

  // if user trying to update someone else profile then it will stop
  if(loggedInUser.role === "customer" && loggedInUser.id !== targetUserIdNumber) {
    return res.status(403).json({
      message: "You can update only your own profile",
      user: req.user
    });
  }

  let updatePayload: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
  };

  if (loggedInUser.role === "admin") {
    updatePayload = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(role !== undefined && { role }),
    };
  } else {
    updatePayload = {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      // role intentionally excluded
    };
  }

  try {
    const result = await userService.updateUser(
      updatePayload.name as string,
      updatePayload.email as string,
      updatePayload.phone as string,
      updatePayload.role as string,
      targetUserId
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "user Updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      user: req.user
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const loggedInUser = req.user!;
  if(loggedInUser.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "only andmin can delete user"
    })
  }
  try {
    const result = await userService.deleteUser(req.params.userId!);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
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

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
