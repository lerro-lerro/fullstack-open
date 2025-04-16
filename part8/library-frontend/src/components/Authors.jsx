import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";
import PropTypes from "prop-types";

const Authors = ({ setError }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const { loading, error, data } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const authors = data?.allAuthors || [];
  const authorOptions = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const submit = async (event) => {
    event.preventDefault();

    if (!name) {
      setError("Please select an author");
      return;
    }

    const bornInt = parseInt(born);
    if (isNaN(bornInt)) {
      setError("Birth year must be a number");
      return;
    }

    try {
      await editAuthor({
        variables: { name, setBornTo: bornInt },
      });
      setName("");
      setBorn("");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born || "unknown"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select
            value={authorOptions.find((o) => o.value === name)}
            onChange={(option) => setName(option?.value)}
            options={authorOptions}
            isClearable={true}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit" disabled={!name}>
          update author
        </button>
      </form>
    </div>
  );
};

Authors.propTypes = {
  setError: PropTypes.func.isRequired,
};

export default Authors;
