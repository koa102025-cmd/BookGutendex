import { createBrowserRouter } from "react-router-dom";

// Import all the page components that will be used in the routes
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: "category/:categoryName", element: <CategoryPage /> },
			{ path: "book/:id", element: <BookDetailPage /> },
			{ path: "favorites", element: <FavoritesPage /> },
		],
	},
]);

export default router;
