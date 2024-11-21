import express from "express";
import {
  createEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
} from "../services/employeeService.js";

const employeeRouter = express.Router();

// Get list of employees
employeeRouter.get("/", async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json({
      status: 200,
      data: employees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

// Create employee
employeeRouter.post("/add", async (req, res) => {
  try {
    const { fname, lname, phoneNumber, dob, address, gender, salary, deptId } =
      req.body;

    const response = await createEmployee({
      fname,
      lname,
      phoneNumber,
      dob,
      address,
      gender,
      salary,
      deptId,
    });

    res.status(201).json({
      status: 201,
      data: {
        message: "Employee created",
        employee: {
          id: response.id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

// Update employee
employeeRouter.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { phoneNumber, deptId, address } = req.body;

  const result = await updateEmployee(id, { phoneNumber, deptId, address });

  res.json({
    status: 201,
    data: result,
  });
});

// Search employee
employeeRouter.get("/search", async (req, res) => {
  try {
    const { employeeId, fname, lname, deptId } = req.query;

    const employees = await searchEmployees({
      employeeId: employeeId,
      fname,
      lname,
      deptId: deptId,
    });

    res.json({
      status: 200,
      data: employees,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

export default employeeRouter;
