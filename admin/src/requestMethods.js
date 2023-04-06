import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmVkNmZmNTUxYTc4MDQ5ZTgxZjVkYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDc5MTMyMywiZXhwIjoxNjgxMDUwNTIzfQ.woO4Dj2eFLxTEVj4IDhdhKZMPJKkWk7ULgvqc5IMx70";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
