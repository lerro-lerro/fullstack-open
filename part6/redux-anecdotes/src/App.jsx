import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Notes from './components/Notes';
import NewNote from './components/NewNote';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initializeNotes } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div style={{ fontFamily: 'sans-serif', margin: '20px' }}>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
