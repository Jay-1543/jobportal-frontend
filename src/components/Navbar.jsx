import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <div className="navbar">

      <Link to="/">Jobs</Link>

      {user?.role === "ADMIN" && (
        <Link to="/add-job">
          Add Job
        </Link>
      )}

      <Link to="/register">
        Register
      </Link>

      <Link to="/login">
        Login
      </Link>

      <Link to="/applications">
        My Applications
      </Link>

      <button
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;