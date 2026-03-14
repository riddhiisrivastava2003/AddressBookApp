

import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/contacts";

export const addContact = (contact) => {
  return axios.post(API_URL, contact);
};

export const getContacts = () => {
  return axios.get(API_URL);
};

export const deleteContact = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const editContact = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

