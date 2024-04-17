import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './register.css'; // Assuming you have a CSS file named Register.css

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: '',
	});
	const history = useHistory();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				'http://localhost:4000/api/auth/registerAdmin',
				formData,
			);
			history.push('/login', {
				message: 'Registration successful. Please log in.',
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='register-container'>
			<form
				onSubmit={handleSubmit}
				className='register-form'>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={formData.username}
					onChange={handleChange}
					required
				/>
				<input
					type='email'
					name='email'
					placeholder='Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<select
					name='role'
					value={formData.role}
					onChange={handleChange}
					required>
					<option value=''>Select Role</option>
					<option value='supplierType1'>Supplier Type 1</option>
					<option value='supplierType2'>Supplier Type 2</option>
					<option value='superAdmin'>Super Admin</option>
				</select>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
}

export default Register;
