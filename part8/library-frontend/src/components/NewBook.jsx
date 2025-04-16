import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS } from "../queries";
import PropTypes from "prop-types";

const NewBook = ({ setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
    update: (cache, { data: { addBook } }) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks = [] }) => {
        return {
          allBooks: allBooks.concat(addBook),
        };
      });
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    const publishedInt = parseInt(published);
    if (isNaN(publishedInt)) {
      setError("Published year must be a number");
      return;
    }

    try {
      await createBook({
        variables: {
          title,
          author,
          published: publishedInt,
          genres,
        },
      });

      setTitle("");
      setAuthor("");
      setPublished("");
      setGenres([]);
      setGenre("");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const addGenre = () => {
    if (genre) {
      setGenres(genres.concat(genre));
      setGenre("");
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published{" "}
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button type="button" onClick={addGenre}>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default NewBook;
