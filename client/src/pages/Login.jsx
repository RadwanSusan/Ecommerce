import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import swal from "sweetalert";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://images.pexels.com/photos/823059/pexels-photo-823059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&fbclid=IwAR0zsSOLR8Rr6qk1JfnpyLxq65qil9fOZtLG99RldVesF9m-4fS_vNBr2l0")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 400px;
	padding: 20px;
	background-color: white;
	${mobile({ width: "75%" })}
	box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.75);
	-webkit-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 4px 3px 13px 0px rgba(0, 0, 0, 0.75);
	border-radius: 5px;
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin-bottom: 10px;
	&:disabled {
		color: green;
		cursor: not-allowed;
	}
`;

const Link = styled.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
`;
const Error = styled.span`
	color: red;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);
	const handleClick = (e) => {
		e.preventDefault();
		if (!username || !password) {
			swal("Please fill in all fields");
		}
		login(dispatch, { username, password });
	};
	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form>
					<Input
						placeholder="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						placeholder="password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleClick} disabled={isFetching}>
						LOGIN
					</Button>
					{error && <Error>Something went wrong...</Error>}
					<Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
					<Link>CREATE A NEW ACCOUNT</Link>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
