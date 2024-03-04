import React, { useState } from 'react';
import axios from 'axios';

function Register() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		role: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:4000/api/auth/registerAdmin',
				formData,
			);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Input fields for username, email, password */}
			<select
				name='role'
				value={formData.role}
				onChange={handleChange}
			>
				<option value=''>Select Role</option>
				<option value='supplierType1'>Supplier Type 1</option>
				<option value='supplierType2'>Supplier Type 2</option>
				<option value='superAdmin'>Super Admin</option>
			</select>
			<button type='submit'>Register</button>
		</form>
	);
}

export default Register;
