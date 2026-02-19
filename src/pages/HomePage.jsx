import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";
import styles from "../css/CategoryPage.module.css";

const HomePage = () => {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get("search");

	// State for books data and pagination
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);

	// Fetch books when searchQuery changes
	useEffect(() => {
		const fetchBooks = async () => {
			setIsLoading(true);

			// Build API URL depending on search query
			let url = searchQuery
				? `https://gutendex.com/books?search=${searchQuery}`
				: `https://gutendex.com/books`;

			try {
				const response = await fetch(url);
				const data = await response.json();

				// Save books and pagination links
				setBooks(data.results);
				setNextPage(data.next);
				setPrevPage(data.previous);
			} catch (error) {
				console.error("Error fetching books:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBooks();
	}, [searchQuery]);

	// Handle pagination (Next / Prev)
	const handlePageChange = async (url) => {
		setIsLoading(true);

		const response = await fetch(url);
		const data = await response.json();

		setBooks(data.results);
		setNextPage(data.next);
		setPrevPage(data.previous);

		setIsLoading(false);

		// Scroll to top after page change
		window.scrollTo(0, 0);
	};

	if (isLoading) return <div>Searching for books... 🔍</div>;

	return (
		<div>
			{/* Page title */}
			<div className={styles.categoryDiv}>
				<h2 className={styles.title}>
					{searchQuery ? (
						<>
							Results for: <span>{searchQuery}</span>
						</>
					) : (
						"Popular Books"
					)}
				</h2>
			</div>

			{/* Books grid */}
			<div className={styles.grid}>
				{books.length > 0 ? (
					books.map((book) => <BookCard key={book.id} book={book} />)
				) : (
					<p>No books found.</p>
				)}
			</div>

			{/* Pagination controls */}
			<div className={styles.pagination}>
				<button
					onClick={() => handlePageChange(prevPage)}
					disabled={!prevPage}
					className={styles.pageBtn}>
					← Prev
				</button>
				<button
					onClick={() => handlePageChange(nextPage)}
					disabled={!nextPage}
					className={styles.pageBtn}>
					Next →
				</button>
			</div>
		</div>
	);
};

export default HomePage;
