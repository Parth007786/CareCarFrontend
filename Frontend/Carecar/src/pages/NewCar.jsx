import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addComplaint } from "../features/car/carSlice";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton"; // Assuming you have a BackButton component

const NewCar = () => {
  const { user } = useSelector((state) => state.auth);
  const { carName, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch(); // Moved inside the component
  const navigate = useNavigate(); // Moved inside the component

  const [formData, setFormData] = useState({
    car: "",
    registration: "",
    description: ""
  });

  const { car, registration, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComplaint(formData));
  };

  useEffect(() => {
    if (isSuccess && carName) {
      navigate("/cars");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [carName, isSuccess, isError, message, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <h1 className="text-center">Raise Your Complaint</h1>
      <div className="card p-2 my-3">
        <input
          type="text"
          name="name"
          className="form-control my-1"
          disabled
          value={user.name}
        />
        <input
          disabled
          type="email"
          name="email"
          value={user.email}
          className="form-control my-1"
        />
        <form onSubmit={handleSubmit}>
          <select
            name="car"
            value={car}
            onChange={handleChange}
            className="form-select my-1"
          >
            <option defaultValue={"#"}>Select your Car</option>
            <option value="tiago">Tiago</option>
            <option value="punch">Punch</option>
            <option value="nexon">Nexon</option>
            <option value="curvv">Curvv</option>
            <option value="harrier">Harrier</option>
            <option value="safari">Safari</option>
          </select>
          <input
            type="text"
            className="form-control my-1"
            placeholder="Enter your Registration e.g(MP09IK9999)"
            value={registration}
            name="registration"
            onChange={handleChange}
          />
          <textarea
            name="description"
            className="form-control my-1"
            required
            placeholder="Describe your Issue"
            value={description}
            onChange={handleChange}
          ></textarea>
          <button className="btn btn-dark w-100 my-2">Raise Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default NewCar;
