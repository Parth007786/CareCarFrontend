import axios from "axios";

const fetchUsers = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(
    "https://carecarbackend-1.onrender.com/api/admin/users",
    options
  );
  return response.data;
};
const fetchCars = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(
    "https://carecarbackend-1.onrender.com/api/admin/cars",
    options
  );
  console.log(response.data);
  return response.data;
};

const fetchNotes = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(
    "https://carecarbackend-1.onrender.com/api/admin/notes",
    options
  );
  return response.data;
};

const adminService = {
  fetchUsers,
  fetchCars,
  fetchNotes
};
export default adminService;
