import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import axios from "axios";
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
						<button>Logout</button>
					</div>
				</nav>
				{showSubMenu ? (
					<div className="navigation-submenu-master">
						<Link
							className="navigation-submenu-master-link-skill"
							style={{ textDecoration: "none" }}
							to="/skills"
						>
							<span>Skill</span>
						</Link>
						<Link
							className="navigation-submenu-master-link-skill-level"
							style={{ textDecoration: "none" }}
							to="/skill-level"
						>
							<span>Skill Level</span>
						</Link>
					</div>
				) : null}
			</header>

			{menu === "profile" ? <UserProfile id={id} user={user} /> : null}
		</>
	);
}
