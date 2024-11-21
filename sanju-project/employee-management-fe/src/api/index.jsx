const BASE_URL = "http://localhost:3000";

export const getDepartments = async () => {
  const response = await fetch(`${BASE_URL}/api/departments`);
  return response.json();
};

export const getAllEmployees = async () => {
  const response = await fetch(`${BASE_URL}/api/employees`);
  return response.json();
};

export const addEmployee = async (employee) => {
  const response = await fetch(`${BASE_URL}/api/employees/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return response.json();
};

export const updateEmployee = async (id, employee) => {
  const response = await fetch(`${BASE_URL}/api/employees/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return response.json();
};

export const searchEmployees = async (queries) => {
  const { employeeId, fname, lname, deptId } = queries;

  const queryString = new URLSearchParams({
    employeeId,
    fname,
    lname,
    deptId,
  });

  console.log("queryString", queryString);

  const response = await fetch(
    `${BASE_URL}/api/employees/search?${queryString}`
  );
  return response.json();
};
