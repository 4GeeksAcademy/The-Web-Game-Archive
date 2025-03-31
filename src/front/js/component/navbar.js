import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/index.css';
import logo from "../../img/logo.png";
import { privateRoute, getInfoUser } from "../../services/APIServices";
import Swal from "sweetalert2";

export const Navbar = () => {

	const [isVerificated, setVerificated] = useState(false);
	const [imgUser, setImgUser] = useState("");
	const [isCollapsed, setIsCollapsed] = useState(true);
	const navigate = useNavigate();

	const toggleNavbar = () => {
		setIsCollapsed(!isCollapsed);
	}

	const checkVerificated = async () => {
		const auth = await privateRoute();
		setVerificated(auth);

		if (!auth) {
			return Swal.fire({
				title: 'Debes Logearte para poder guardar tus partidas',
				text: 'Puedes seguir jugando sin guardar o pulsar el boton Login',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Login',
				cancelButtonText: 'Seguir sin registrarse',
				reverseButtons: true
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/user-login");
				} else {
					Swal.fire('Bienvenido', 'Seguiras jugando sin guardar', 'info');
				}
			});
		}
	};

	const checkInfoUser = async () => {
		try {
			const id = sessionStorage.getItem("id_user");
			const info = await getInfoUser(id);

			if (info.user_img) {
				setImgUser(info.user_img);
			}
		} catch (error) {
			console.log(error, "Error al solicitar la info de User");
		}
	};

	useEffect(() => {
		checkVerificated();
		checkInfoUser();
	}, []);

	const handleLogOut = () => {
		setVerificated(false);
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("id_user");
		navigate("/user-login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-background" style={{ zIndex: "100" }}>
			<div className={isCollapsed ? "container" : "container-fluid"}>
				{/* Logo a la izquierda */}
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<img src={logo} alt="Logo" height="70em" width="auto" />
				</Link>

				{/* Botón de hamburguesa */}
				<button
					className="navbar-toggler custom-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded={!isCollapsed}
					aria-label="Toggle navigation"
					onClick={toggleNavbar}
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				{/* Menú desplegable */}
				<div className="collapse navbar-collapse navbar-background" id="navbarNav">
					<ul className="navbar-nav mx-auto text-center">
						<li className="nav-item">
							<Link to="/" className="nav-link text-white fs-5">Home</Link>
						</li>
						<li className="nav-item">
							<Link to="/Leaderboards" className="nav-link text-white fs-5">Leaderboards</Link>
						</li>
					</ul>
					<div className="d-flex mt-3 justify-content-center mb-4">
						{!isVerificated ? (
							<>
								<Link to="User-Register" className="btn btn-outline-danger text text-light me-2">Register</Link>
								<Link to="User-Login" className="btn btn-danger">Log In</Link>
							</>
						) : (
							<>
								{imgUser ? (
									<Link to="Users" className="me-2 rounded-circle">
										<img
											src={imgUser}
											className="rounded-circle border border-2 border-danger"
											style={{ width: "3.5em", height: "3.5em", objectFit: "cover" }}
											alt="👤 Profile"
										/>
									</Link>
								) : (
									<Link to="Users" className="btn btn-danger me-2">👤 Profile</Link>
								)}
								<button onClick={handleLogOut} className="btn btn-outline-danger text text-light me-2">
									Logout
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};