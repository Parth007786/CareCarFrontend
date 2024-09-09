import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/car/carSlice";
import "./Home.css"; // We'll create a CSS file for custom styles

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, navigate, dispatch]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome {user?.name}!</h1>
        <p className="hero-subtitle">
          {user?.isAdmin && user?.email === "admin@gmail.com"
            ? "Manage users and job cards with ease."
            : "Create and manage your job cards effortlessly."}
        </p>
      </div>

      {/* Options Section */}
      <div className="options-section">
        <div className="row">
          {user?.isAdmin && user?.email === "admin@gmail.com" ? (
            <>
              <div className="col-lg-6 col-md-12 mb-4">
                <Link to="/admin/users" className="option-card">
                  <div className="card-content">
                    <h3>View All Users</h3>
                    <p>Manage all registered users in the system.</p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 col-md-12 mb-4">
                <Link to="/admin/cars" className="option-card">
                  <div className="card-content">
                    <h3>View All Job Cards</h3>
                    <p>Check and manage all job cards created by users.</p>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-lg-6 col-md-12 mb-4">
                <Link to="/create" className="option-card">
                  <div className="card-content">
                    <h3>Create Job Card</h3>
                    <p>Start by creating a new job card for your project.</p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 col-md-12 mb-4">
                <Link to="/cars" className="option-card">
                  <div className="card-content">
                    <h3>View Job Cards</h3>
                    <p>View and manage all your created job cards.</p>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
