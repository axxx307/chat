import axios from 'axios';
const API_PATH = 'http://localhost:4000'

export const getUsers = () => axios.get(`${API_PATH}/users`);
export const getChats = (userId) => axios.get(`${API_PATH}/getUserChats/${userId}`);
export const getChatMessages = (chatId) => axios.get(`${API_PATH}/messages?chatId=${chatId}`);