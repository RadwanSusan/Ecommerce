import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzJmNmYzN2Q1Y2ZjYWQ4ZTRmNmQyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTI0ODEwMywiZXhwIjoxNjgxNTA3MzAzfQ.0xZbQ1_wRE-ZWUkjzdIdAa641m2ir5txDPQApw4YGYc";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: { token: `Bearer ${TOKEN}` },
});
