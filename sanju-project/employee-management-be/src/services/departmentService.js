import { sql } from "./getSqlInstance.js";

export const getDepartments = async () => {
  const departments = await sql`SELECT * FROM departments`;

  return departments;
};
