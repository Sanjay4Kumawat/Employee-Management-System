import { sql } from "./getSqlInstance.js";

export const getEmployees = async () => {
  const employees = await sql`SELECT * FROM employees ORDER BY employeeId`;

  return employees;
};

export const createEmployee = async (employee) => {
  const { fname, lname, phoneNumber, dob, address, gender, salary, deptId } =
    employee;

  const result = await sql`
    INSERT INTO employees (fname, lname, phoneNumber, dob, address, gender, salary, deptId)
    VALUES (${fname}, ${lname}, ${phoneNumber}, ${dob}, ${address}, ${gender}, ${salary}, ${deptId})
    RETURNING *;
  `;

  return result;
};

export const updateEmployee = async (id, employee) => {
  const updates = [];
  const values = [];
  let paramCount = 1;

  // Only add fields that exist in the employee object
  if (employee.phoneNumber !== undefined) {
    updates.push(`phoneNumber = $${paramCount}`);
    values.push(employee.phoneNumber.trim());
    paramCount++;
  }
  if (employee.address !== undefined) {
    updates.push(`address = $${paramCount}`);
    values.push(employee.address.trim());
    paramCount++;
  }
  if (employee.deptId !== undefined) {
    updates.push(`deptId = $${paramCount}`);
    values.push(employee.deptId);
    paramCount++;
  }

  // If no updates provided, return early
  if (updates.length === 0) {
    return null;
  }

  // Add id as the last parameter
  values.push(id);

  const query = `
    UPDATE employees 
    SET ${updates.join(", ")}
    WHERE employeeId = $${paramCount}
    RETURNING *;
  `;

  const result = await sql(query, values);
  return result;
};

export const searchEmployees = async ({ employeeId, fname, lname, deptId }) => {
  let conditions = [];
  let values = [];
  let paramCount = 1;

  let query = "SELECT * FROM employees";

  if (employeeId || fname || lname || deptId) {
    query += " WHERE ";

    if (employeeId) {
      conditions.push(`employeeId = $${paramCount}`);
      values.push(employeeId);
      paramCount++;
    }
    if (fname) {
      conditions.push(`fname ILIKE $${paramCount}`);
      values.push(`%${fname}%`);
      paramCount++;
    }
    if (lname) {
      conditions.push(`lname ILIKE $${paramCount}`);
      values.push(`%${lname}%`);
      paramCount++;
    }
    if (deptId) {
      conditions.push(`deptId = $${paramCount}`);
      values.push(deptId);
      paramCount++;
    }

    query += conditions.join(" AND ");
  }

  const employees = await sql(query, values);

  return employees;
};
