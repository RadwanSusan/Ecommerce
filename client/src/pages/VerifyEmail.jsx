import { useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import React from 'react';
const VerifyEmail = () => {
	useEffect(() => {
		const verifyEmail = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const token = urlParams.get('token');
			console.log(token);
			if (token) {
				try {
					const response = await axios.get(
						`http://localhost:4000/api/auth/verifyEmail?token=${token}`,
					);

					console.log(response.data);
					if (response.data.message === 'Email verified successfully!') {
						swal('Your email has been verified!');
						var isAppOpened = false;
						window.location.href = 'maanstore://verifyemail';
						setTimeout(function () {
							if (!isAppOpened) {
								console.log('app not found');
								window.location.href = '/login';
							}
						}, 1000);
						window.addEventListener('focus', function () {
							isAppOpened = true;
						});
					} else {
						swal('Failed to verify email. Invalid or expired token.');
					}
				} catch (error) {
					console.error('Failed to verify email:', error);
					swal(
						'An error occurred while verifying your email. Please try again later.',
					);
				}
			} else {
				swal('No verification token provided.');
			}
		};
		verifyEmail();
	}, []);
	return <div>Verifying email...</div>;
};
export default VerifyEmail;
