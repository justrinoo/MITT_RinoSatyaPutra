import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import axios from "axios";
import UserSkill from "./UserSkill";
import MasterSkill from "./MasterSkill";
import MasterSkillLevel from "./MasterSkillLevel";

export default function Home() {
	const [user, setUser] = useState({});
	const [menu, setMenu] = useState("");
	const [showSubMenu, setShowSubMenu] = useState(false);

	const username = localStorage.getItem("username");
	const id = localStorage.getItem("user_id");

	useEffect(() => {
		async function getProfile() {
			try {
				const response = await axios.get(`http://localhost:3000/profile/${id}`);
				setUser(response?.data);
			} catch (error) {
				new Error(error);
			}
		}
		getProfile();
	}, [id]);
	return (
		<>
			<header>
				<nav className="navigation">
					<div className="navigation__menu">
						<div className="navigation-submenu">
							<span className="navigation-link" onClick={() => setMenu("home")}>
								Home
							</span>
						</div>
						<div className="navigation-submenu">
							<span
								className="navigation-link"
								onClick={() => setMenu("profile")}
							>
								User Profile
							</span>
						</div>
						<div className="navigation-submenu">
							<span
								className="navigation-link"
								onClick={() => setMenu("user-skill")}
							>
								User Skill
							</span>
						</div>
						<div className="navigation-submenu">
							<span
								className="navigation-link"
								onClick={() =>
									showSubMenu === false
										? setShowSubMenu(true)
										: setShowSubMenu(false)
								}
							>
								Master
							</span>
						</div>
					</div>
					<div className="navigation__menu">
						<h4 style={{ padding: "0px 20px", color: "#AEAEAE" }}>
							{username}
						</h4>
						<button
							onClick={() => {
								localStorage.clear();
								window.location.href = "/auth/login";
							}}
						>
							Logout
						</button>
					</div>
				</nav>
				{showSubMenu ? (
					<div className="navigation-submenu-master">
						<span
							className="navigation-submenu-master-link-skill"
							onClick={() => setMenu("master-skill")}
						>
							Skill
						</span>
						<span
							className="navigation-submenu-master-link-skill-level"
							onClick={() => setMenu("master-skill-level")}
						>
							Skill Level
						</span>
					</div>
				) : null}
			</header>

			{menu === "profile" ? (
				<UserProfile id={id} user={user} />
			) : menu === "user-skill" ? (
				<UserSkill />
			) : menu === "master-skill" ? (
				<MasterSkill />
			) : menu === "master-skill-level" ? (
				<MasterSkillLevel />
			) : null}
		</>
	);
}
