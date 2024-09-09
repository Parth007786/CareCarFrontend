import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./components/LoginPage";
import Register from "./components/RegistrationPage";
import AllComplaints from "./pages/AllComplaints";
import SingleComplaints from "./pages/SingleComplaints";
import NewCar from "./pages/NewCar";
import AllUsers from "./pages/AllUsers";
import AllCars from "./pages/AllCars";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<NewCar />} />
          <Route path="cars" element={<AllComplaints />} />
          <Route path="cars/:id" element={<SingleComplaints />} />
          <Route path="admin/users" element={<AllUsers />} />
          <Route path="admin/cars" element={<AllCars />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
