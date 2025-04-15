import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const stats = useSelector(state => state);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>Unicafe Feedback</h1>
      <div>
        <p>Good: {stats.good}</p>
        <p>Ok: {stats.ok}</p>
        <p>Bad: {stats.bad}</p>
      </div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>Good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={() => dispatch({ type: 'ZERO' })}>Reset Stats</button>
    </div>
  );
};

export default App;
