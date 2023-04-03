import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjJkYmZlYTU1NGU1YWU1ZWI4OTg1NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDUyMTIyMCwiZXhwIjoxNjgwNzgwNDIwfQ.Qzznf_dIOBPIXdViVtaMWg8I7MIsImpKRnpSdOa1HB0";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
