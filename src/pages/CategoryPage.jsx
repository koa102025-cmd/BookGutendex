import { useParams } from "react-router-dom";
import { useFetchBooks } from "../hooks/useFetchBooks.jsx";
import BookCard from "../components/BookCard.jsx";
import styles from "../css/CategoryPage.module.css";

const CategoryPage = () => {
	const { categoryName } = useParams();

	// Base URL depends on the category from the URL
	const baseUrl = `https://gutendex.com/books?topic=${categoryName}`;

	// Pass baseUrl to custom hook. It handles fetching and pagination.
	const { books, next, prev, isLoading, error, setCurrentUrl } =
		useFetchBooks(baseUrl);

	// Display error if fetching failed
	if (error) return <div className={styles.errorContainer}>⚠️ {error}</div>;

	return (
		<section className={styles.container}>
			<div className={styles.categoryDiv}>
				<h2 className={styles.title}>
					Category: <span>{categoryName}</span>
				</h2>
			</div>

			{/* Grid of book cards or skeletons while loading */}
			<div className={styles.grid}>
				{isLoading
					? [...Array(12)].map((_, i) => (
							<div key={i} className={styles.skeletonCard} />
						))
					: books.map((book) => <BookCard key={book.id} book={book} />)}
			</div>

			{/* Pagination controls if not loading and there are pages */}
			{!isLoading && (next || prev) && (
				<nav className={styles.pagination}>
					<button
						onClick={() => setCurrentUrl(prev)}
						disabled={!prev}
						className={`${styles.pageBtn} ${!prev ? styles.disabled : ""}`}>
						← Prev
					</button>

					<button
						onClick={() => setCurrentUrl(next)}
						disabled={!next}
						className={`${styles.pageBtn} ${!next ? styles.disabled : ""}`}>
						Next →
					</button>
				</nav>
			)}
		</section>
	);
};

export default CategoryPage;
