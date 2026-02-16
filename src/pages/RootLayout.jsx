import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";

import React from "react";

const RootLayout = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
