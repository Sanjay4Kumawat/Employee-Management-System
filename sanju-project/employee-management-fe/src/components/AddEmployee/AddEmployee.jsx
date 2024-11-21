import { useState } from "react";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextareaAutosize,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "./AddEmployee.css";
import SelectDepartment from "./SelectDepartment";
import { addEmployee } from "../../api";

function AddEmployee() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: null,
    address: "",
    mobileNumber: "",
    department: "",
    salary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission

    try {
      setLoading(true);
      addEmployee({
        fname: formData.firstName,
        lname: formData.lastName,
        gender: formData.gender,
        phoneNumber: formData.mobileNumber,
        address: formData.address,
        dob: formData.dob.format("YYYY/MM/DD"),
        salary: formData.salary,
        deptId: formData.department,
      }).then((res) => {
        if (res.status === 201) {
          setLoading(false);
          alert("Employee added successfully");
          setFormData({
            firstName: "",
            lastName: "",
            gender: "",
            mobileNumber: "",
            address: "",
            dob: null,
            department: "",
            salary: "",
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Backdrop open={true} style={{ zIndex: 1 }}>
            <CircularProgress />
          </Backdrop>
        </div>
      )}

      <form className="add-employee-form" onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={formData.dob}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
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
        <TextField
          label="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          inputProps={{ maxLength: 10 }}
          fullWidth
          margin="normal"
        />

        <SelectDepartment
          value={formData.department}
          handleDeptChange={handleChange}
        />

        <TextField
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Add Employee
        </Button>
      </form>
    </>
  );
}

export default AddEmployee;
