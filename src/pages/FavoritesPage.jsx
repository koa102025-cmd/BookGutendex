import { useState } from "react";
import BookCard from "../components/BookCard.jsx";
import styles from "../css/CategoryPage.module.css";
import { BookOpenText } from "lucide-react";

const FavoritesPage = () => {
	const [favorites, setFavorites] = useState(() => {
		const storedFavs = localStorage.getItem("favorites");
		return storedFavs ? JSON.parse(storedFavs) : [];
	});

	const handleRemove = (bookId) => {
		const updatedFavorites = favorites.filter((book) => book.id !== bookId);
		setFavorites(updatedFavorites);
		localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
	};

	// Render empty state if no favorites exist
	if (favorites.length === 0) {
		return (
			<div className={styles.container}>
				<div className={styles.categoryDiv}>
					<h2 className={styles.title}>
						Your Library is <span>empty</span>{" "}
						<BookOpenText color="#459dfc" size={30} />
					</h2>
				</div>
				<p className={styles.emptyMessage}>
					*start adding books to see them here!
				</p>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.categoryDiv}>
				<h2 className={styles.title}>
					Your <span>Favorite</span> books
				</h2>
			</div>

			<div className={styles.grid}>
				{favorites.map((book) => (
					<BookCard key={book.id} book={book} onRemove={handleRemove} />
				))}
			</div>
		</div>
	);
};

export default FavoritesPage;
