import Logo1 from "../assets/carlogin.png";
import { useEffect, useState } from "react";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isSuccess, message, isError, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("/login", { email, password });
  //     alert("Login Successful");
  //     localStorage.setItem("authToken", response.data.token);
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Login failed !");
  //   }
  // };

  return (
    <div>
      {/* Login for car */}
      <div className="container d-flex">
        {/* Left Section with Image */}
        <div className="image-section flex-grow-1">
          <img src={Logo1} alt="Car Login" className="img-fluid h-100 w-100" />
        </div>

        {/* Right Section with Login Form */}
        <div className="form-card card mx-3 p-4">
          <h3 className="mb-4">SignIn</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              SignIn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
