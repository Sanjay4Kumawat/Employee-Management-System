import express from "express";
import { getDepartments } from "../services/departmentService.js";

const departmentRouter = express.Router();

// Get list of departments
departmentRouter.get("/", async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json({
      status: 200,
      data: departments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

export default departmentRouter;
