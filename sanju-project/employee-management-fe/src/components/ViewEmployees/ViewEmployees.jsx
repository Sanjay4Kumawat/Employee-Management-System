import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Backdrop,
  CircularProgress,
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { getAllEmployees, getDepartments, searchEmployees } from "../../api";
import { useNavigate } from "react-router-dom";

const CellStyle = { whiteSpace: "nowrap", width: "max-content" };

const ViewEmployees = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    employeeId: "",
    fname: "",
    lname: "",
    deptId: "",
  });

  const handleFilterChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleClearFilter = () => {
    setFilters({
      employeeId: "",
      fname: "",
      lname: "",
      deptId: "",
    });

    setLoading(true);
    getAllEmployees()
      .then((data) => {
        setEmployees(data.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleApplyFilter = () => {
    setLoading(true);
    searchEmployees(filters)
      .then((data) => {
        setEmployees(data.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getDepartments()
      .then((data) => setDepartments(data.data))
      .catch(console.error);

    getAllEmployees()
      .then((data) => {
        setEmployees(data.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={4}
        bgcolor={"#f5f5f5"}
        borderRadius={1}
      >
        <Box sx={{ p: 2, display: "flex", gap: 2 }}>
          <TextField
            label="Employee ID"
            name="employeeId"
            variant="outlined"
            size="small"
            value={filters.id}
            onChange={handleFilterChange("employeeId")}
          />
          <TextField
            label="First Name"
            name="fname"
            variant="outlined"
            size="small"
            value={filters.fname}
            onChange={handleFilterChange("fname")}
          />
          <TextField
            label="Last Name"
            name="lname"
            variant="outlined"
            size="small"
            value={filters.lname}
            onChange={handleFilterChange("lname")}
          />
          <Select
            name="deptId"
            size="small"
            value={filters.deptId}
            onChange={handleFilterChange("deptId")}
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
        </Box>

        <Box display={"flex"} gap={2}>
          <Button variant="outlined" onClick={handleClearFilter}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleApplyFilter}>
            Search
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        style={{
          marginTop: "16px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={CellStyle}>Employee ID</TableCell>
              <TableCell sx={CellStyle}>First Name</TableCell>
              <TableCell sx={CellStyle}>Last Name</TableCell>
              <TableCell sx={CellStyle}>Gender</TableCell>
              <TableCell sx={CellStyle}>Date of Birth</TableCell>
              <TableCell sx={CellStyle}>Address</TableCell>
              <TableCell sx={CellStyle}>Mobile Number</TableCell>
              <TableCell sx={CellStyle}>Department</TableCell>
              <TableCell sx={CellStyle}>Salary</TableCell>
              <TableCell sx={CellStyle}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{
                  backgroundColor: "#f5f5f5",
                }}
              >
                <TableCell sx={CellStyle}>{employee.employeeid}</TableCell>
                <TableCell sx={CellStyle}>{employee.fname}</TableCell>
                <TableCell sx={CellStyle}>{employee.lname}</TableCell>
                <TableCell sx={CellStyle}>{employee.gender}</TableCell>
                <TableCell sx={CellStyle}>
                  {employee.dob.split("T").at(0)}
                </TableCell>
                <TableCell sx={CellStyle}>{employee.address}</TableCell>
                <TableCell sx={CellStyle}>{employee.phonenumber}</TableCell>
                <TableCell sx={CellStyle}>
                  {
                    departments?.find((item) => item.id === employee.deptid)
                      ?.name
                  }
                </TableCell>
                <TableCell sx={CellStyle}>{employee.salary}</TableCell>
                <TableCell sx={CellStyle}>
                  <Button
                    onClick={() => {
                      navigate(`/edit-employee/${employee.employeeid}`, {
                        state: {
                          phoneNumber: employee.phonenumber,
                          address: employee.address,
                          deptId: employee.deptid,
                        },
                      });
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ViewEmployees;
