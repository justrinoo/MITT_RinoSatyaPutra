import axios from "axios";
import React, { useEffect, useState } from "react";
export default function UserProfile({ id, user }) {
	const [formProfile, setFormProfile] = useState({
		name: user.name,
		address: user.address,
		bod: user.bod,
		email: user.email,
		username: user.username,
	});

	const onChangeInput = (event) => {
		setFormProfile({ ...formProfile, [event.target.name]: event.target.value });
	};

	const updateProfile = async (event) => {
		event.preventDefault();
		try {
			await axios.put(`http://localhost:3000/profile/${id}`, formProfile);
			window.location.reload();
			alert("Profile Berhasil diubah!");
		} catch (error) {
			new Error(error);
		}
	};
	console.log(user);
	return (
		<section>
			<hr />
			<form onSubmit={updateProfile}>
				<div>
					<label htmlFor="name">Name</label>
					<input
						onChange={onChangeInput}
						type="text"
						name="name"
						id="name"
						value={formProfile.name}
					/>
				</div>
				<div>
					<label htmlFor="address">Address</label>
					<textarea
						onChange={onChangeInput}
						name="address"
						id="address"
						value={formProfile.address}
						cols="30"
						rows="5"
					></textarea>
				</div>
				<div>
					<label htmlFor="bod">Birth Of Date</label>
					<input
						value={formProfile.bod}
						onChange={onChangeInput}
						type="date"
						name="bod"
						id="bod"
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						value={formProfile.email}
						onChange={onChangeInput}
						type="email"
						name="email"
						id="email"
					/>
				</div>
				<div>
					<button>Update Profile</button>
				</div>
			</form>
		</section>
	);
}
