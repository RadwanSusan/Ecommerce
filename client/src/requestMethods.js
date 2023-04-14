import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzJmNmYzN2Q1Y2ZjYWQ4ZTRmNmQyNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTQ3MjU4NiwiZXhwIjoxNjgxNzMxNzg2fQ.s5pT_1beYMyuY4Xs-w7qzpxzTZLwvne2EQVPxjb1DfI';

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: { token: `Bearer ${TOKEN}` },
});
