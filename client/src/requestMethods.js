import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";
const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWVkYTBlMDViZGJiMGVkNTRkMjRiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTgzODIyOSwiZXhwIjoxNjgwMDk3NDI5fQ.kqGtnHpifZ3j1sAqPH2mj8ntIptIBslQBiV0rfkbfKg";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: { token: `Bearer ${TOKEN}` },
});
