import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../css/BookDetailPage.module.css";
import {
	Star,
	ChevronLeft,
	Download,
	BookOpen,
	Globe,
	Tag,
} from "lucide-react";

const BookDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const fetchBookData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`https://gutendex.com/books/${id}`);
				if (!response.ok) throw new Error("Failed to fetch book details.");
				const data = await response.json();
				setBook(data);

				const savedFavorites =
					JSON.parse(localStorage.getItem("favorites")) || [];
				setIsFavorite(savedFavorites.some((fav) => fav.id === data.id));
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchBookData();
	}, [id]);

	const handleFavoriteToggle = () => {
		const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
		let updated;
		if (isFavorite) {
			updated = savedFavorites.filter((fav) => fav.id !== book.id);
		} else {
			updated = [...savedFavorites, book];
		}
		localStorage.setItem("favorites", JSON.stringify(updated));
		setIsFavorite(!isFavorite);
	};

	if (error) return <div className={styles.errorContainer}>⚠️ {error}</div>;

	return (
		<main className={styles.container}>
			<button onClick={() => navigate(-1)} className={styles.backBtn}>
				<ChevronLeft size={20} /> Back
			</button>

			{loading ? (
				<div className={styles.skeletonCard} />
			) : (
				<div className={styles.bookCardExpanded}>
					<div className={styles.imageSection}>
						<img
							src={book.formats["image/jpeg"]}
							alt={book.title}
							className={styles.bookCoverLarge}
						/>
					</div>

					<div className={styles.infoSection}>
						<h1 className={styles.title}>{book.title}</h1>
						<p className={styles.authorName}>
							By:{" "}
							{book.authors.map((a) => a.name).join(", ") || "Unknown Author"}
						</p>

						<div className={styles.metadata}>
							<div className={styles.metaRow}>
								<span>
									<Globe size={16} /> <strong>Language</strong>
								</span>
								<span>{book.languages.join(", ").toUpperCase()}</span>
							</div>
							<div className={styles.metaRow}>
								<span>
									<Download size={16} /> <strong>Downloads</strong>
								</span>
								<span>{book.download_count.toLocaleString()}</span>
							</div>
							<div className={styles.metaRow}>
								<span>
									<Tag size={16} /> <strong>Categories</strong>
								</span>
								<span className={styles.subjects}>
									{book.subjects.join(", ")}
								</span>
							</div>
						</div>

						<div className={styles.buttonGroup}>
							<a
								href={
									book.formats["text/html"] || book.formats["text/plain"] || "#"
								}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.btnRead}>
								<BookOpen size={20} /> Read Online
							</a>
							<button
								onClick={handleFavoriteToggle}
								className={`${styles.favButton} ${isFavorite ? styles.active : ""}`}
								title={
									isFavorite ? "Remove from favorites" : "Add to favorites"
								}>
								<Star
									size={24}
									fill={isFavorite ? "#ffd447" : "none"}
									color={isFavorite ? "#ffd447" : "#636e72"}
								/>
							</button>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default BookDetailPage;
