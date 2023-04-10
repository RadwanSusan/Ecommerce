import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzJmNmYzN2Q1Y2ZjYWQ4ZTRmNmQyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTA2MTcwNiwiZXhwIjoxNjgxMzIwOTA2fQ.qkK1ZRtF61rKwbV2on00OHeddIzfGtvb2rg7qLEk5j0";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
