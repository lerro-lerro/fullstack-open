import PropTypes from 'prop-types';

const AnecdoteForm = ({ createAnecdote }) => {
    const onCreate = (event) => {
      event.preventDefault();
      const content = event.target.anecdote.value;
      event.target.anecdote.value = '';
      createAnecdote(content);
    };
  
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={onCreate}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      </div>
    );
  };

  AnecdoteForm.propTypes = {
    createAnecdote: PropTypes.func.isRequired,
  };
  
  export default AnecdoteForm;
  