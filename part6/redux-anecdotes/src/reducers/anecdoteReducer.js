// src/reducers/anecdoteReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../services/notes';

export const initializeNotes = createAsyncThunk(
  'anecdotes/initializeNotes',
  async () => {
    const notes = await noteService.getAll();
    return notes;
  }
);

export const createNote = createAsyncThunk(
  'anecdotes/createNote',
  async (content) => {
    const newNote = await noteService.createNew(content);
    return newNote;
  }
);

export const voteNote = createAsyncThunk(
  'anecdotes/voteNote',
  async (note) => {
    const updatedNote = await noteService.update(note.id, {
      ...note,
      votes: note.votes + 1,
    });
    return updatedNote;
  }
);

export const toggleImportance = createAsyncThunk(
  'anecdotes/toggleImportance',
  async (note) => {
    const updatedNote = await noteService.update(note.id, {
      ...note,
      important: !note.important,
    });
    return updatedNote;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeNotes.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteNote.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        return state.map(n => n.id === updatedNote.id ? updatedNote : n);
      })
      .addCase(toggleImportance.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        return state.map(n => n.id === updatedNote.id ? updatedNote : n);
      });
  },
});

export default anecdoteSlice.reducer;
