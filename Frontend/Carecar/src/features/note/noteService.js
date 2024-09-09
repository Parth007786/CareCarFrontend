import axios from "axios";

const fetchNotes = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(
    `https://carecarbackend-1.onrender.com/api/service/${id}/note`,
    options
  );
  return response.data;
};

const addNote = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(
    `https://carecarbackend-1.onrender.com/api/service/${formData.id}/note`,
    formData,
    options
  );
  return response.data;
};

const noteService = {
  fetchNotes,
  addNote
};

export default noteService;
