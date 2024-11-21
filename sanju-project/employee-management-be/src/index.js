// const dotenv = require("dotenv");
import express from "express";
import cors from "cors";
import employeeRouter from "./routes/employees.js";
import departmentRouter from "./routes/departments.js";

// dotenv.config({
//   path: "../.env",
// });

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/employees", employeeRouter);
app.use("/api/departments", departmentRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
