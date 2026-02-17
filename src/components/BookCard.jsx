import styles from "../css/BookCard.module.css";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
	const coverImg = book.formats["image/jpeg"];
	return (
		<div className={styles.card}>
			<img src={coverImg} alt={book.title} className={styles.image} />
			<h3 className={styles.title}>{book.title}</h3>
			<p>{book.authors[0]?.name || "Unknown Author"}</p>
			{/* Добавили класс className={styles.link} */}
			<Link to={`/book/${book.id}`} className={styles.link}>
				View Details
			</Link>
		</div>
	);
};

export default BookCard;
