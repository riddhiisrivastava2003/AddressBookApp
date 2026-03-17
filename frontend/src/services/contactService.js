import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// ------------------------
// CONTACTS APIs
// ------------------------
const CONTACTS_URL = `${API_BASE_URL}/contacts`;

export const getContacts = () => axios.get(CONTACTS_URL);

export const deleteContact = (id) => axios.delete(`${CONTACTS_URL}/${id}`);

export const addContact = (contact) => axios.post(CONTACTS_URL, contact);

export const editContact = (id, data) => axios.put(`${CONTACTS_URL}/${id}`, data);

// SORTING APIs
export const sortByName = () => axios.get(`${CONTACTS_URL}/sort/name`);
export const sortByCity = () => axios.get(`${CONTACTS_URL}/sort/city`);
export const sortByState = () => axios.get(`${CONTACTS_URL}/sort/state`);
export const sortByZip = () => axios.get(`${CONTACTS_URL}/sort/zip`);

// ------------------------
// AUTH APIs
// ------------------------
const AUTH_URL = `${API_BASE_URL}/auth`;

export const registerUser = (user) => axios.post(`${AUTH_URL}/register`, user);

export const loginUser = (user) => axios.post(`${AUTH_URL}/login`, user);

export const logoutUser = () => axios.post(`${AUTH_URL}/logout`);
