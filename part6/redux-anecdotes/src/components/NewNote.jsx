import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
    dispatch(setNotificationWithTimeout(`New anecdote created: "${content}"`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="note" placeholder="New anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewNote;
