import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import "./App.css";
import ViewEmployees from "./components/ViewEmployees/ViewEmployees";
import EditEmployee from "./components/EditEmployee/EditEmployee";
import { Box } from "@mui/material";

function App() {
  return (
    <div className="app">
      <header className="header">
        <NavBar />
      </header>
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <h1 style={{
                  color: 'black'
                }} >Welcome to the Employee Management System</h1>
                <p style={{
                  color: 'black'
                }}>
                  This is a simple employee management system that allows you to
                  add employees, view employees, and view analytics.
                </p>
              </Box>
            }
          />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view-employees" element={<ViewEmployees />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
