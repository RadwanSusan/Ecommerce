import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// .currentUser.accessToken;

// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2U5MjkyNGM3ZjhiOTViZWJkODE0MSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTkyNTczMywiZXhwIjoxNjgyMTg0OTMzfQ.45bhRY0ayC8v5K2cmtKFoT00CFo0pS9G42qb5CxFWVY";

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
