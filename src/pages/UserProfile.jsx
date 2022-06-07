import axios from "axios";
import React, { useState } from "react";
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
			<section className="userprofile__main">
				<h2>User Profile</h2>
				<form className="form__userprofile" onSubmit={updateProfile}>
					<div className="form__userprofile_group">
						<label htmlFor="name">Name</label>
						<input
							onChange={onChangeInput}
							className="form__userprofile_control"
							type="text"
							name="name"
							id="name"
							value={formProfile.name}
						/>
					</div>
					<div className="form__userprofile_group">
						<label htmlFor="address">Address</label>
						<textarea
							onChange={onChangeInput}
							className="form__userprofile_control"
							name="address"
							id="address"
							value={formProfile.address}
							cols="30"
							rows="5"
						></textarea>
					</div>
					<div className="form__userprofile_group">
						<label htmlFor="bod">Birth Of Date</label>
						<input
							value={formProfile.bod}
							onChange={onChangeInput}
							className="form__userprofile_control"
							type="date"
							name="bod"
							id="bod"
						/>
					</div>
					<div className="form__userprofile_group">
						<label htmlFor="email">Email</label>
						<input
							value={formProfile.email}
							onChange={onChangeInput}
							className="form__userprofile_control"
							type="email"
							name="email"
							id="email"
						/>
					</div>
					<div className="form__userprofile_group">
						<button className="button">Update Profile</button>
					</div>
				</form>
			</section>
		</section>
	);
}
