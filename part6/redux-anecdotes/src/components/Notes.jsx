import { useSelector, useDispatch } from 'react-redux';
import { voteNote, toggleImportance } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const Notes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  const filteredAnecdotes = anecdotes.filter(anecdote => {
    const matchesText = anecdote.content.toLowerCase().includes(filter.text.toLowerCase());
    let matchesImportance = true;
    if (filter.importance === "IMPORTANT") {
      matchesImportance = anecdote.important;
    } else if (filter.importance === "NONIMPORTANT") {
      matchesImportance = !anecdote.important;
    }
    return matchesText && matchesImportance;
  });

  const vote = (anecdote) => {
    dispatch(voteNote(anecdote));
    dispatch(setNotificationWithTimeout(`You voted for: "${anecdote.content}"`, 5));
  };

  const toggleNoteImportance = (anecdote) => {
    dispatch(toggleImportance(anecdote));
    dispatch(setNotificationWithTimeout(`Toggled importance for: "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {filteredAnecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id} style={{ marginBottom: '10px' }}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)} style={{ marginLeft: '10px' }}>
                vote
              </button>
              <button onClick={() => toggleNoteImportance(anecdote)} style={{ marginLeft: '10px' }}>
                {anecdote.important ? 'Mark as Nonimportant' : 'Mark as Important'}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notes;
