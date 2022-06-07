import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserSkill() {
	const [userSkils, setUserSkills] = useState([]);
	const [getUserName, setGetUserName] = useState([]);
	const [getUserLevel, setGetUserLevel] = useState([]);
	const [tempId, setTempId] = useState();
	const [showCreateSkill, setShowCreateSkill] = useState(false);
	const [showEditSkill, setShowEditSkill] = useState(false);

	async function getUserSkill() {
		const response = await axios.get("http://localhost:3000/userSkill");
		setUserSkills(response.data);
	}
	async function getUserSkillName() {
		const response = await axios.get("http://localhost:3000/skills");
		setGetUserName(response.data);
	}
	async function getUserSkilLevel() {
		const response = await axios.get("http://localhost:3000/skillLevel");
		setGetUserLevel(response.data);
	}
	useEffect(() => {
		getUserSkilLevel();
		getUserSkillName();
		getUserSkill();
	}, []);
	return (
		<div>
			<div className="title__skill">
				<h2>User Skill List</h2>
				<button onClick={setShowCreateSkill}>Add New</button>
			</div>
			<table className="table" border={1} cellSpacing={0}>
				<thead>
					<tr>
						<td>Skill</td>
						<td>Level</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{userSkils.map((value, idx) => (
						<tr key={idx}>
							<td>{value.userSkillName}</td>
							<td>{value.userSkillLevel}</td>
							<td>
								<button
									onClick={() => {
										setShowEditSkill(true);
										setTempId(value.id);
									}}
								>
									Edit
								</button>
								<button
									onClick={async () => {
										await axios.delete(
											`http://localhost:3000/userSkill/${value.id}`
										);
										alert("Berhasil menghapus user skill");
										// window.location.reload();
										getUserSkill();
									}}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showCreateSkill ? (
				<CreateSkill
					getUserName={getUserName}
					getUserLevel={getUserLevel}
					getUserSkill={getUserSkill}
				/>
			) : null}
			{showEditSkill ? (
				<EditSkill
					id={tempId}
					getUserName={getUserName}
					getUserLevel={getUserLevel}
					getUserSkill={getUserSkill}
				/>
			) : null}
		</div>
	);
}

function CreateSkill({ getUserName, getUserLevel, getUserSkill }) {
	const [userSkillName, setUserSkillName] = useState("");
	const [userSkillLevel, setUserSkillLevel] = useState("");

	const createFormSkill = async (event) => {
		event.preventDefault();
		for (let id = 0; id < 1; id++) {
			await axios.post("http://localhost:3000/userSkill", {
				id: id,
				userSkillName,
				userSkillLevel,
			});
			await axios.get("http://localhost:3000/userSkill");
			alert("Berhasil menambahkan User Skill");
			// window.location.reload();
			getUserSkill();
		}
	};

	return (
		<>
			<h2>Add User Skill</h2>
			<form onSubmit={createFormSkill}>
				<div>
					<label htmlFor="skill">Skill</label>
					<select
						onChange={(event) => setUserSkillName(event.target.value)}
						name="userSkillName"
						id="userSkillName"
					>
						<option hidden>Choose{"{ Skill }"}</option>
						{getUserName.map((value, idx) => (
							<option value={value.skillName} key={idx}>
								{value.skillName}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="level">level</label>
					<select
						onChange={(event) => setUserSkillLevel(event.target.value)}
						name="userSkillLevel"
						id="userSkillLevel"
					>
						<option hidden>Choose{"{ SkillLevel }"}</option>
						{getUserLevel.map((value, idx) => (
							<option value={value.skillName} key={idx}>
								{value.skillName}
							</option>
						))}
					</select>
				</div>
				<button type="submit">Add</button>
			</form>
		</>
	);
}

function EditSkill({ id, getUserSkill, getUserName, getUserLevel }) {
	const [detailSkill, setDetailSkill] = useState({});
	const [userSkillName, setUserSkillName] = useState(detailSkill.userSkillName);
	const [userSkillLevel, setUserSkillLevel] = useState(
		detailSkill.userSkillLevel
	);

	const EditFormSkill = async (event) => {
		event.preventDefault();
		await axios.put(`http://localhost:3000/userSkill/${id}`, {
			userSkillName,
			userSkillLevel,
		});
		await axios.get("http://localhost:3000/userSkill");
		alert("Berhasil Mengubah User Skill");
		// window.location.reload();
		getUserSkill();
	};

	useEffect(() => {
		async function getDetailUserSkill() {
			const response = await axios.get(`http://localhost:3000/userSkill/${id}`);
			setDetailSkill(response.data);
		}
		getDetailUserSkill();
	}, [id]);
	return (
		<>
			<h2>Edit User Skill</h2>
			<form onSubmit={EditFormSkill}>
				<div>
					<label htmlFor="skill">Skill</label>
					<select
						onChange={(event) => setUserSkillName(event.target.value)}
						name="userSkillName"
						id="userSkillName"
						value={userSkillName}
					>
						<option hidden>{detailSkill.userSkillName}</option>
						{getUserName.map((value, idx) => {
							return (
								<option value={value.skillName} key={idx}>
									{value.skillName}
								</option>
							);
						})}
					</select>
				</div>
				<div>
					<label htmlFor="level">level</label>
					<select
						onChange={(event) => setUserSkillLevel(event.target.value)}
						name="userSkillLevel"
						id="userSkillLevel"
						value={userSkillLevel}
					>
						<option hidden>{detailSkill.userSkillLevel}</option>
						{getUserLevel.map((value, idx) => {
							return (
								<option value={value.skillName} key={idx}>
									{value.skillName}
								</option>
							);
						})}
					</select>
				</div>
				<button type="submit">Edit</button>
			</form>
		</>
	);
}
