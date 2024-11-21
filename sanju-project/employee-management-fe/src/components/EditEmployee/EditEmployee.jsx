import { useState } from "react";
import {
  TextField,
  TextareaAutosize,
  Button,
  FormControl,
  FormLabel,
} from "@mui/material";
import { updateEmployee } from "../../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditEmployee.css";
import SelectDepartment from "../AddEmployee/SelectDepartment";

function EditEmployee() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  console.log("params", params);

  const [formData, setFormData] = useState({
    address: location.state.address,
    phoneNumber: location.state.phoneNumber,
    department: location.state.deptId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      updateEmployee(params.id, {
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        deptId: formData.department,
      }).then((res) => {
        if (res.status === 201) {
          alert("Employee updated successfully");
          navigate("/view-employees");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="edit-employee-form" onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel htmlFor="address">Address</FormLabel>
        <TextareaAutosize
          minRows={4}
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={{
            width: "97%",
            marginTop: "16px",
            padding: "8px",
            background: "transparent",
            borderRadius: "4px",
            border: "1px solid #ccc",
            color: "black",
          }}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <TextField
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
          fullWidth
          margin="normal"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="department">Department</FormLabel>

        <SelectDepartment
          value={formData.department}
          handleDeptChange={handleChange}
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Update Employee
      </Button>
    </form>
  );
}

export default EditEmployee;
