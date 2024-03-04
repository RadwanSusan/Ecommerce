import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import loginIllustration from '../../Assets/auth-v2-login-illustration-light.png';
import './login.css';
import React from 'react';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	let { isFetching, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const handleClick = (e) => {
		e.preventDefault();
		if (!email || !password) {
			swal('Please fill in all fields');
		}
		login(dispatch, { email, password });
	};
	useEffect(() => {
		if (error) {
			swal('Invalid Credentials Try Again!');
			setEmail('');
			setPassword('');
			document.getElementById('email').value = '';
			document.getElementById('password').value = '';
		}
	}, [error]);
	return (
		<div className='all-conent'>
			<div className='leftside'>
				<div className='leftside-content-images'>
					<img
						alt='login-illustration'
						className='login-illustration'
						src={loginIllustration}
					/>
				</div>
			</div>
			<section className='container588'>
				<div className='row row550'>
					<div className='col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
						<div className='account-wall2'>
							<div
								id='my-tab-content'
								className='tab-content'
							>
								<div
									className='tab-pane2 active'
									id='login'
								>
									<h5 class='welcom-admin'>WELCOME TO PMEADMIN! 👋🏻</h5>
									<div className='form-signin'>
										<input
											type='text'
											id='email'
											className='form-control'
											placeholder='Email'
											required
											onChange={(e) => setEmail(e.target.value)}
										/>
										<input
											type='password'
											id='password'
											className='form-control last'
											placeholder='Password'
											required
											onChange={(e) => setPassword(e.target.value)}
										/>
										<span className='no-padding col-lg-6 col-md-6  col-sm-6 text-right'>
											<a
												href='/forgot'
												className='forgot2'
												data-toggle='tab'
											>
												Forgot Password
											</a>
										</span>
										<button
											className='btn btn-lg btn-saffron2 btn-block'
											onClick={handleClick}
										>
											Login
										</button>
										<div className='register-link'>
											{/* <Link to='/register'>
												Don't have an account? Sign up here
											</Link> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};
export default Login;
