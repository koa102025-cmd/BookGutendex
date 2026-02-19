import styles from "../css/BookCard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Star } from "lucide-react";

const BookCard = ({ book }) => {
	const [isFavorite, setIsFavorite] = useState(() => {
		const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
		return favorites.some((fav) => fav.id === book.id);
	});

	const coverImg = book.formats["image/jpeg"];

	const toggleFavorite = (e) => {
		e.preventDefault();
		let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

		if (isFavorite) {
			favorites = favorites.filter((fav) => fav.id !== book.id);
		} else {
			favorites.push(book);
		}

		localStorage.setItem("favorites", JSON.stringify(favorites));
		setIsFavorite(!isFavorite);
	};
	return (
		<div className={styles.card}>
			<img src={coverImg} alt={book.title} className={styles.image} />
			<h3 className={styles.title}>{book.title}</h3>
			<p>{book.authors[0]?.name || "Unknown Author"}</p>
			<Link to={`/book/${book.id}`} className={styles.link}>
				View Details
			</Link>
			<button
				onClick={toggleFavorite}
				className={styles.favButton}
				title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
				<Star
					size={20}
					color={isFavorite ? "#ffc107" : "#666"}
					fill={isFavorite ? "#ffc107" : "none"}
				/>
			</button>
		</div>
	);
};

export default BookCard;
