// import axios from "axios";

// const API_URL = "http://localhost:8080/contacts";

// export const addContact = (contact) => {
//   return axios.post(API_URL, contact);
// };

// export const getContacts = () => {
//   return axios.get(API_URL);
// };

// export const deleteContact = (id) => {
//   return axios.delete(`${API_URL}/${id}`);
// };

// export const editContact = (id, data) => {
//   return axios.put(`${API_URL}/${id}`, data);
// };

// /* SORTING APIs */

// export const sortByName = () => {
//   return axios.get(`${API_URL}/sort/name`);
// };

// export const sortByCity = () => {
//   return axios.get(`${API_URL}/sort/city`);
// };

// export const sortByState = () => {
//   return axios.get(`${API_URL}/sort/state`);
// };

// export const sortByZip = () => {
//   return axios.get(`${API_URL}/sort/zip`);
// };

import axios from "axios";

const API_URL = "http://localhost:8080/contacts";

export const getContacts = () => axios.get(API_URL);

export const deleteContact = (id) => axios.delete(`${API_URL}/${id}`);

export const addContact = (contact) => axios.post(API_URL, contact);

export const editContact = (id, data) => axios.put(`${API_URL}/${id}`, data);

/* SORT APIs */

export const sortByName = () => axios.get(`${API_URL}/sort/name`);

export const sortByCity = () => axios.get(`${API_URL}/sort/city`);

export const sortByState = () => axios.get(`${API_URL}/sort/state`);

export const sortByZip = () => axios.get(`${API_URL}/sort/zip`);