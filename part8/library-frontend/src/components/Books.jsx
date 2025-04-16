import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre || null },
  });

  if (result.loading) return <div>loading...</div>;

  const books = result.data.allBooks;
  const genres = [...new Set(books.flatMap((b) => b.genres))];

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
