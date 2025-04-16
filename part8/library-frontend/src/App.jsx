import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useApolloClient, useSubscription } from "@apollo/client";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";
import Notify from "./components/Notify";
import Authors from "./components/Authors";
import { BOOK_ADDED, ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      notify(`Added book ${addedBook.title}`);

      const genres = ["", ...addedBook.genres];
      genres.forEach((genre) => {
        client.cache.updateQuery(
          {
            query: ALL_BOOKS,
            variables: { genre: genre || null },
          },
          (existingBooks) => {
            if (!existingBooks) return { allBooks: [addedBook] };
            const seen = new Set(existingBooks.allBooks.map((b) => b.title));
            if (seen.has(addedBook.title)) return existingBooks;
            return {
              allBooks: [...existingBooks.allBooks, addedBook],
            };
          }
        );
      });
    },
  });

  if (!token) {
    return (
      <div>
        <Notify message={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <nav>
        <Link to="/authors">Authors</Link> | <Link to="/books">Books</Link> |{" "}
        <Link to="/add">Add Book</Link> |{" "}
        <Link to="/recommended">Recommended</Link> |{" "}
        <button onClick={logout}>Logout</button>
      </nav>

      <Notify message={errorMessage} />

      <Routes>
        <Route path="/authors" element={<Authors setError={notify} />} />
        <Route path="/books" element={<Books setError={notify} />} />
        <Route path="/add" element={<NewBook setError={notify} />} />
        <Route path="/recommended" element={<RecommendedBooks />} />
        <Route path="/" element={<Navigate replace to="/books" />} />
      </Routes>
    </div>
  );
};

export default App;
