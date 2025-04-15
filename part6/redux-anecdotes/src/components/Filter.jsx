import { useDispatch, useSelector } from 'react-redux';
import { setTextFilter, setImportanceFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleTextChange = (event) => {
    dispatch(setTextFilter(event.target.value));
  };

  const handleImportanceChange = (event) => {
    dispatch(setImportanceFilter(event.target.value));
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div>
        <input
          type="text"
          placeholder="Filter anecdotes by text"
          value={filter.text}
          onChange={handleTextChange}
          style={{ marginBottom: '5px' }}
        />
      </div>
      <div>
        <span>Show anecdotes: </span>
        <label>
          All
          <input
            type="radio"
            name="importance"
            value="ALL"
            checked={filter.importance === "ALL"}
            onChange={handleImportanceChange}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Important
          <input
            type="radio"
            name="importance"
            value="IMPORTANT"
            checked={filter.importance === "IMPORTANT"}
            onChange={handleImportanceChange}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          Nonimportant
          <input
            type="radio"
            name="importance"
            value="NONIMPORTANT"
            checked={filter.importance === "NONIMPORTANT"}
            onChange={handleImportanceChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Filter;
