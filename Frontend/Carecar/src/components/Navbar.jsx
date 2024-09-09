import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            className="navbar-brand"
            style={{ height: "100px" }}
          />
          <span className="navbar-brand  mb-0 h1">
            <Link className="first" to={"/"}>
              CareCar
            </Link>
          </span>
        </div>
        <div className="d-flex flex-grow-1 justify-content-center">
          <div className="input-group" style={{ maxWidth: "400px" }}></div>
        </div>
        <div className="d-flex align-items-center">
          <span>
            {user ? (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to={"/register"} className="btn btn-outline-warning me-2">
                  SignUp
                </Link>
                <Link to={"/login"} className="btn btn-outline-success me-2">
                  SignIn
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
