import axios from "axios";

const raiseComplaint = async (formData, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(
    "https://carecarbackend-1.onrender.com/api/service",
    formData,
    options
  );
  return response.data;
};

const fetchComplaints = async (token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(
    "https://carecarbackend-1.onrender.com/api/service",
    options
  );
  return response.data;
};

const fetchComplaint = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(
    `https://carecarbackend-1.onrender.com/api/service/${id}`,
    options
  );
  return response.data;
};

const updateComplaint = async (id, token) => {
  let options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(
    `https://carecarbackend-1.onrender.com/api/service/${id}`,
    { status: "closed" },
    options
  );

  return response.data;
};

const carService = {
  raiseComplaint,
  fetchComplaints,
  fetchComplaint,
  updateComplaint
};

export default carService;
