import { useState } from 'react';
import { publicRequest } from '../.././requestMethods';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './forgot.css';
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
				<div className='col-md-44 col-md-offset-4 col-sm-66 col-sm-offset-3'>
					<div className='account-wall'>
						<div
							id='my-tab-content'
							className='tab-content'>
							<div
								className='tab-pane'
								id='forgot'>
								<img
									className='profile-img'
									src='data:image/jpeg;base64,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'
									alt='zaid'
								/>
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
										className='btn btn-lg btn-info btn-block submit'>
										submit
									</button>
								</form>
								<p className='text-center'>
									<Link
										href='/login'
										data-toggle='tab'>
										<i className='fa fa-hand-o-left'></i>&nbsp;Back to
										Login
									</Link>
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
