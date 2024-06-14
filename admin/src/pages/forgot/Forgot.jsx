import { useState } from 'react';
import { publicRequest } from '../.././requestMethods';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './forgot.css';
import React from 'react';

const Forgot = () => {
	const [email, setEmail] = useState('');

	const handleClick = async (e) => {
		e.preventDefault();
		if (email.length < 1) {
			return swal('Please fill email');
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return swal('Please enter a valid email address!');
		}
		swal('We have sent you a link to your email address...');
		const res = await publicRequest.post('/auth/forgot-password', {
			email,
		});
	};

	return (
		<section className='container501'>
			<div className='row'>
				<div className='col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3'>
					<div
						className='account-wall'
						style={{ backgroundColor: '#ff6600' }}>
						<div
							id='my-tab-content'
							className='tab-content'>
							<div
								className='tab-pane'
								id='forgot'>
								<form
									className='form-signin'
									action=''
									method=''>
									<input
										type='text'
										className='form-control'
										placeholder='Email id'
										required
										onChange={(e) => setEmail(e.target.value)}
									/>
									<p>&nbsp;</p>
									<button
										onClick={handleClick}
										className='btn btn-lg btn-info btn-block submit'
										style={{ backgroundColor: '#ff6600' }}>
										submit
									</button>
								</form>
								<p className='text-center'>
									{/* <Link
										href='/login'
										data-toggle='tab'>
										<i className='fa fa-hand-o-left'></i>&nbsp;Back to
										Login
									</Link> */}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Forgot;
