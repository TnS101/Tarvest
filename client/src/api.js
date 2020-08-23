import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:3000/api'});

export const insertCard = args => api.post('/card', args);
export const getAllCards = () => api.get('/allCards');
export const updateCard = (id, args) => api.put(`/card/${id}`, args);
export const deleteCard = id => api.delete(`/card/${id}`);
export const getCard = id => api.get(`/card/${id}`);

const apis = {insertCard, getAllCards, updateCard, deleteCard, getCard};

export default apis;
