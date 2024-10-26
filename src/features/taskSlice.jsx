import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  status: "All",
};

// Fetch data from api
const fetchTodo = createAsyncThunk("tasks/fetchTodo", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const data = await response.json();

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: "",
    state: task.completed ? "done" : "todo",
  }));
});
