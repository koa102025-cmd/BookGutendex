import { useState, useEffect } from "react";

// Custom hook to fetch books and handle pagination
export const useFetchBooks = (initialUrl) => {
	const [data, setData] = useState({ books: [], next: null, prev: null });
	const [currentUrl, setCurrentUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Reset currentUrl when initialUrl changes (e.g., category change)
	useEffect(() => {
		setCurrentUrl(initialUrl);
	}, [initialUrl]);

	// Fetch data whenever currentUrl changes
	useEffect(() => {
		const fetchBooks = async () => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(currentUrl);
				if (!response.ok) throw new Error("Failed to load books");

				const json = await response.json();

				setData({
					books: json.results,
					next: json.next,
					prev: json.previous,
				});

				// Scroll to top after new data is loaded
				window.scrollTo({ top: 0, behavior: "smooth" });
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBooks();
	}, [currentUrl]);

	return { ...data, isLoading, error, setCurrentUrl, currentUrl };
};
