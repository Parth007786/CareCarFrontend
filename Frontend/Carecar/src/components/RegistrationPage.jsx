import Logo from "../assets/carRepair.jpg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerUser } from "../features/auth/authSlice";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

import Confetti from "react-confetti";

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    gender: ""
  });
  const { name, email, password, confirmpassword, gender } = formData;
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Password does not match");
    }
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isSuccess) {
      setShowConfetti(true);
      toast.success("Registration Successful!");

      // Stop the confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
    if (isError && message) {
      toast.error(message || "Registration not done");
    }
  }, [user, isSuccess, message, isError, navigate]);

  if (isLoading) {
    return <Loading />;
  }
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmpassword, setConfirmPassword] = useState("");
  // const [gender, setGender] = useState("");

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   if (password !== confirmpassword) {
  //     alert("Password do not match");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("/", {
  //       name,
  //       email,
  //       password,
  //       gender
  //     });
  //     console.log(response.data);
  //     alert("Registration Successful");
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Registration Failed");
  //   }
  // };

  return (
    <div>
      {showConfetti && <Confetti />}
      {/* Registration for car */}
      <div className="container d-flex mb-5">
        {/* Left Section with Image */}
        <div className="image-section flex-grow-1">
          <img
            src={Logo}
            alt="Car Registration"
            className="img-fluid h-100 w-100"
          />
        </div>

        {/* Right Section with Form */}
        <div className="form-card card mx-3 p-4">
          <h3 className="mb-4">SignUp</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                value={name}
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Confirm Password"
                value={confirmpassword}
                name="confirmpassword"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Gender :</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Female</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    checked={gender === "male"}
                    value="male"
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Male</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
