import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, BookOpenText } from "lucide-react";
import styles from "../css/Header.module.css";

// List of book categories for the dropdown menu
const categories = [
	"Fiction",
	"Mystery",
	"Thriller",
	"Romance",
	"Fantasy",
	"Morality",
	"Society",
	"Power",
	"Justice",
	"Adventure",
	"Tragedy",
	"War",
	"Philosophy",
];

const Header = () => {
	const [query, setQuery] = useState("");
	// Dropdown menu state
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navigate = useNavigate();
	const dropdownRef = useRef(null);

	// Handle search form submission
	const handleSearch = (e) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/?search=${query.trim()}`);
			setQuery("");
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className={styles.header}>
			{/* Left part: Logo + Search */}
			<div className={styles.headerLeft}>
				<Link
					to="/"
					className={styles.logo}
					onClick={() => setIsMenuOpen(false)} // Close menu on logo click
				>
					<span>
						<BookOpenText />
					</span>{" "}
					Gutendex
				</Link>

				<form onSubmit={handleSearch} className={styles.searchForm}>
					<div className={styles.inputWrapper}>
						<input
							type="text"
							placeholder="Search books..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="submit">
							<Search size={18} />
						</button>
					</div>
				</form>
			</div>

			{/* Navigation menu */}
			<nav className={styles.nav}>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				<Link to="/favorites" className={styles.link}>
					Favorites ⭐
				</Link>

				<div className={styles.divider} />

				{/* Categories dropdown */}
				<div className={styles.dropdown} ref={dropdownRef}>
					<button
						type="button"
						className={styles.dropdownBtn}
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						Categories {isMenuOpen ? "▴" : "▾"}
					</button>

					{isMenuOpen && (
						<div className={styles.dropdownContent}>
							{categories.map((cat) => (
								<Link
									key={cat}
									to={`/category/${cat.toLowerCase()}`}
									className={styles.dropdownLink}
									onClick={() => setIsMenuOpen(false)} // Close menu on selection
								>
									{cat}
								</Link>
							))}
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
