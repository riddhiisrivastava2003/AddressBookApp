

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// ------------------------
// CONTACTS APIs
// ------------------------
const CONTACTS_URL = `${API_BASE_URL}/contacts`;

// ✅ Get Contacts (user wise / admin wise)
export const getContacts = () => {
  const username = localStorage.getItem("username");

  if (username === "admin") {
    return axios.get(`${CONTACTS_URL}/admin`);
  }

  return axios.get(`${CONTACTS_URL}/${username}`);
};

// ✅ Add Contact (FIXED)
export const addContact = (contact) => {
  const username = localStorage.getItem("username");
  return axios.post(`${CONTACTS_URL}/${username}`, contact);
};

// ✅ Delete Contact
export const deleteContact = (id) =>
  axios.delete(`${CONTACTS_URL}/${id}`);

// ✅ Edit Contact
export const editContact = (id, data) =>
  axios.put(`${CONTACTS_URL}/${id}`, data);

// ------------------------
// SORTING APIs
// ------------------------
export const sortByName = () =>
  axios.get(`${CONTACTS_URL}/sort/name`);

export const sortByCity = () =>
  axios.get(`${CONTACTS_URL}/sort/city`);

export const sortByState = () =>
  axios.get(`${CONTACTS_URL}/sort/state`);

export const sortByZip = () =>
  axios.get(`${CONTACTS_URL}/sort/zip`);

// ------------------------
// AUTH APIs
// ------------------------
const AUTH_URL = `${API_BASE_URL}/auth`;

export const registerUser = (user) =>
  axios.post(`${AUTH_URL}/register`, user);

// ✅ LOGIN (IMPORTANT FIX)
export const loginUser = async (user) => {
  const response = await axios.post(`${AUTH_URL}/login`, user);

  // 🔥 Save username in localStorage
  localStorage.setItem("username", response.data.username);

  return response;
};

export const logoutUser = () => {
  localStorage.removeItem("username");
  return axios.post(`${AUTH_URL}/logout`);
};


