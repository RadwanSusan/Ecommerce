import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzJmNmYzN2Q1Y2ZjYWQ4ZTRmNmQyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTM4NTE4OSwiZXhwIjoxNjgxNjQ0Mzg5fQ.wh0mxk3EuCRNJL5oQmFAT4iEXskIl-PCOULDkHNtwHI";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	headers: { token: `Bearer ${TOKEN}` },
});
