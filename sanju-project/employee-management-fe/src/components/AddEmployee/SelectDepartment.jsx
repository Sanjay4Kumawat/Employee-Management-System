/* eslint-disable react/prop-types */
import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getDepartments } from "../../api";

const SelectDepartment = ({ value, handleDeptChange }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments()
      .then((data) => setDepartments(data.data))
      .catch(console.error);
  }, []);

  if (departments.length === 0) {
    return null;
  }

  return (
    <FormControl fullWidth margin="normal">
      <Select
        name="department"
        value={value}
        onChange={handleDeptChange}
        displayEmpty
      >
        <MenuItem key={"select-department"} value="" disabled>
          Department
        </MenuItem>
        {departments.map((dept) => (
          <MenuItem key={dept.id} value={dept.id}>
            {dept.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDepartment;
