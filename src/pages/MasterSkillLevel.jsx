import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MasterSkillLevel() {
	const [MasterSkils, setMasterSkills] = useState([]);
	const [tempId, setTempId] = useState();
	const [showCreateSkill, setShowCreateSkill] = useState(false);
	const [showEditSkill, setShowEditSkill] = useState(false);

	async function getskills() {
		const response = await axios.get("http://localhost:3000/skillLevel");
		setMasterSkills(response.data);
	}
	useEffect(() => {
		getskills();
	}, []);
	return (
		<div>
			<div className="title__skill">
				<h2>Master Skill Level List</h2>
				<button onClick={setShowCreateSkill}>Add New</button>
			</div>
			<table className="table" border={1} cellSpacing={0}>
				<thead>
					<tr>
						<td>Skill Id</td>
						<td>Skill Name</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{MasterSkils.map((value, idx) => (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{value.skillName}</td>
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
											`http://localhost:3000/skillLevel/${value.id}`
										);
										alert("Berhasil menghapus Master Skill");
										// window.location.reload();
										getskills();
									}}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showCreateSkill ? <CreateSkill getskills={getskills} /> : null}
			{showEditSkill ? <EditSkill id={tempId} getskills={getskills} /> : null}
		</div>
	);
}

function CreateSkill({ getskills }) {
	const [masterSkillName, setMasterSkillName] = useState("");

	const createFormSkill = async (event) => {
		event.preventDefault();
		for (let id = 0; id < 1; id++) {
			await axios.post("http://localhost:3000/skillLevel", {
				id: id,
				skillName: masterSkillName,
			});
			await axios.get("http://localhost:3000/skillLevel");
			alert("Berhasil menambahkan Master Skill");
			// window.location.reload();
			getskills();
		}
	};

	return (
		<>
			<h2>Add Master Skill Level</h2>
			<form onSubmit={createFormSkill}>
				<div>
					<label htmlFor="skill">Skill</label>
					<input
						type="text"
						onChange={(event) => setMasterSkillName(event.target.value)}
						name="skillName"
						id="skillName"
					/>
				</div>

				<button type="submit">Add</button>
			</form>
		</>
	);
}
function EditSkill({ id, getskills }) {
	const [detailSkill, setDetailSkill] = useState({});
	const [masterSkillName, setMasterSkillName] = useState("");
	const EditFormSkill = async (event) => {
		event.preventDefault();
		await axios.put(`http://localhost:3000/skillLevel/${id}`, {
			skillName: masterSkillName,
		});
		await axios.get("http://localhost:3000/skillLevel");
		alert("Berhasil Mengubah Master Skill");
		// window.location.reload();
		getskills();
	};

	useEffect(() => {
		async function getDetailskills() {
			const response = await axios.get(
				`http://localhost:3000/skillLevel/${id}`
			);
			setDetailSkill(response.data);
		}
		getDetailskills();
	}, [id]);
	return (
		<>
			<h2>Edit Master Skill Level</h2>
			<form onSubmit={EditFormSkill}>
				<div>
					<label htmlFor="skill">Skill</label>
					<input
						type="text"
						onChange={(event) => setMasterSkillName(event.target.value)}
						name="skillName"
						id="skillName"
					/>
				</div>

				<button type="submit">Edit</button>
			</form>
		</>
	);
}
