import styles from "../css/Header.module.css";
import { Link } from "react-router-dom";

// Array of book categories for the navigation menu
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
	return (
		<header className={styles.header}>
			<h1>Gutendex Library</h1>
			<div>
				<input type="text" placeholder="Search books..." />
			</div>

			<nav className={styles.nav}>
				<Link to="/" className={styles.link}>
					Home
				</Link>
				<Link to="/favorites" className={styles.link}>
					Favorites
				</Link>

				{categories.map((cat) => (
					<Link
						key={cat}
						to={`/category/${cat.toLowerCase()}`}
						className={styles.link}>
						{cat}
					</Link>
				))}
			</nav>
		</header>
	);
};

export default Header;
