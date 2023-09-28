import styled from 'styled-components';
import { mobile } from '../responsive';
import { useState } from 'react';
import { publicRequest } from '../requestMethods';
import swal from 'sweetalert';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://images.pexels.com/photos/3839432/pexels-photo-3839432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1&fbclid=IwAR0CUEhHnUuQcPqabtvtvz6d9HoxWvm3FB3k54iuowLURwoS6fOKKrDGcqQ')
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 40%;
	padding: 20px;
	background-color: white;
	${mobile({ width: '75%' })}
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
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
`;

const Register = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(''); // New state variable for phone number

	const handleClick = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			// const usernameRegex = /^[a-zA-Z0-9]+$/; //
			// if (username.length < 6) {
			// 	return swal('Username must be at least 6 characters!');
			// }
			// if (!usernameRegex.test(username)) {
			// 	return swal(
			// 		'Username must contain at least one letter, one number and one special character!',
			// 	);
			// }
			const emailRes = await publicRequest.get(`/auth/checkEmail/${email}`);
			if (emailRes.data === 'Email already exists!') {
				return swal('Email already exists please try again!');
			}
			const passwordRegex =
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			if (!passwordRegex.test(password)) {
				return swal(
					'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character!',
				);
			}
			const res = await publicRequest.post('/auth/register', {
				username,
				password,
				confirmPassword,
				email,
				phoneNumber, // Include the phone number in the request payload
			});
			if (res.statusText === 'Created') {
				swal('should be make verification email');
				setUsername('');
				setPassword('');
				setConfirmPassword('');
				setEmail('');
				setTimeout(() => {
					window.location.href = `/login`;
				}, 1000);
			}
		} else if (password !== confirmPassword) {
			swal('Please check for password!');
			return;
		}
	};

	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form>
					<Input
						placeholder='Username'
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<Input
						type='email'
						placeholder='Email'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Input
						placeholder='Password'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Input
						placeholder='Confirm password'
						type='password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<Input
						placeholder='Phone Number' // New input field for phone number
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
					<Agreement>
						By creating an account, I consent to the processing of my
						personal data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<Button onClick={handleClick}>CREATE</Button>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
