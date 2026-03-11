// import axios from "axios";

// const API_URL = "http://localhost:8080/contacts";

// export const addContact = (contact) => {
//   return axios.post(API_URL, contact);
// };

// export const getContacts = () => {
//   return axios.get(API_URL);
// };

// // export const deleteContact = (name) => {
// //   return axios.delete(`${API_URL}/${name}`);
// // };
// export const deleteContact = (id) => {
//   return axios.delete(`${API_URL}/${id}`);
// };
// const removeContact = async (id) => {
//   await deleteContact(id);
//   loadContacts();
// };

// export const editContact = (name, data) => {
//   return axios.put(`${API_URL}/${name}`, data);
// };

import axios from "axios";

const API_URL = "http://localhost:8080/contacts";

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

// import axios from "axios";

// const API = "http://localhost:8080/contacts";

// export const getContacts = () => axios.get(API);

// export const addContact = (contact) => axios.post(API, contact);