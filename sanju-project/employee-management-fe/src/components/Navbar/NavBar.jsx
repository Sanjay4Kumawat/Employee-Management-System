import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/add-employee");
            }}
          >
            Add Employee
          </a>
        </li>
        <li className="navbar-item">
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate("/view-employees");
            }}
          >
            View Employees
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
